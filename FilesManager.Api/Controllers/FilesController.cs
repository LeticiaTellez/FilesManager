using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Azure.Storage.Blobs;
using FilesManager.Logic.CosmoDBServices;
using FilesManager.Logic.Extensions;
using FilesManager.Domain;

namespace FilesManager.Api.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class FilesController : ControllerBase
    {
        private readonly ICosmosDbService _cosmosDbService;
        private readonly BlobServiceClient blobServiceClient;

        public FilesController(ICosmosDbService cosmosDbService, BlobServiceClient blobServiceClient)
        {
            _cosmosDbService = cosmosDbService ?? throw new ArgumentNullException(nameof(cosmosDbService));
            this.blobServiceClient = blobServiceClient;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            return Ok(await _cosmosDbService.GetMultipleAsync(Constants.SELECT_LIST));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Domain.File file)
        {
            file.Id = Guid.NewGuid().ToString();
            await _cosmosDbService.AddAsync(file);

            return Ok(new { id = file.Id });
        }

        [Authorize]
        [HttpGet("download/{id}")]
        public async Task<IActionResult> Download(string id)
        {
            var fileRecord = await _cosmosDbService.GetAsync(id);

            if (fileRecord.FileName == null)
                return NotFound();

            var blobClient = GetBlobClient(fileRecord.FileName);
            var download = await blobClient.DownloadAsync();

            string contentType = GetFileType(fileRecord.FileName);

            return File(download.Value.Content, contentType, fileRecord.OriginalName);
        }

        private static string GetFileType(string fileName)
        {
            var reg = Microsoft.Win32.Registry.ClassesRoot.OpenSubKey(Path.GetExtension(fileName));
            string contentType = "application/unknown";

            if (reg != null)
            {
                string registryContentType = reg.GetValue("Content Type") as string;

                if (!string.IsNullOrWhiteSpace(registryContentType))
                {
                    contentType = registryContentType;
                }
            }

            return contentType;
        }

        [Authorize]
        [HttpPost("Upload")]
        public async Task<IActionResult> Upload(IFormFile file, string name, string userId, string description)
        {
            long size = file.Length;
            var (isValid, error) = file.Validate(name, userId);

            if (!isValid)
                return BadRequest(error);

            string fileName = $"{DateTime.Now.TimeOfDay}-{name}";

            using var stream = new MemoryStream();
            await file.CopyDataToStream(stream);
            var blobClient = GetBlobClient(fileName);

            var exists = await blobClient.ExistsAsync();
            if (exists.Value)
            {
                return Ok(new { status = "error", message = $"Ya existe un archivo con el nombre {fileName}", size, name });
            }

            await blobClient.UploadAsync(stream);


            var fileRecord = new Domain.File(userId, fileName, name, description, size.ToString(), GetFileType(fileName));
            await _cosmosDbService.AddAsync(fileRecord);

            return Ok(new { status = "success", size, name });
        }

        private BlobClient GetBlobClient(string fileName)
        {
            var containerClient = blobServiceClient.GetBlobContainerClient(Constants.CONTAINER);
            var blobClient = containerClient.GetBlobClient(fileName);
            return blobClient;
        }
    }
}
