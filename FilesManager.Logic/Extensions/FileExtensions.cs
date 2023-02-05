using Microsoft.AspNetCore.Http;

namespace FilesManager.Logic.Extensions
{
    public static class FileExtensions
    {
        public static (bool isValid, object? error) Validate(this IFormFile file, string fileName, string userId)
        {
            var fileIsValid = file != null || file?.Length > 0;
            var fileNameIsValid = !string.IsNullOrWhiteSpace(fileName);

            if (!fileIsValid)
                return (false, GetErrorObject("El archivo no es válido", fileName, userId));

            if (!fileNameIsValid)
                return (false, GetErrorObject("El nombre del archivo no es válido", fileName, userId));

            return (true, null);
        }

        private static object GetErrorObject(string message, string fileName, string userId)
        => new { status = "error", message, fileName, userId };

        public async static Task<MemoryStream> CopyDataToStream(this IFormFile file, MemoryStream stream)
        {
            await file.CopyToAsync(stream);
            stream.Position = 0;
            return stream;
        }
    }
}
