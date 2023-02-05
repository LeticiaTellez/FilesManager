using Newtonsoft.Json;

namespace FilesManager.Domain
{
    public class File
    {
        public File(string userId, string fileName, string name, string description, string size, string fileType)
        {
            Id = Guid.NewGuid().ToString();
            UserId = userId;
            FileName = fileName;
            OriginalName = name;
            Description = description;
            Size = size;
            FileType = fileType;
            CreatedAt = DateTime.Now;
        }

        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
        [JsonProperty(PropertyName = "user_id")]
        public string UserId { get; set; }
        [JsonProperty(PropertyName = "file_name")]
        public string FileName { get; set; }
        [JsonProperty(PropertyName = "original_name")]
        public string OriginalName { get; set; }
        [JsonProperty(PropertyName = "description")]
        public string Description { get; set; }
        [JsonProperty(PropertyName = "size")]
        public string Size { get; set; }
        [JsonProperty(PropertyName = "file_type")]
        public string FileType { get; set; }
        [JsonProperty(PropertyName = "created_at")]
        public DateTime CreatedAt { get; set; }
    }
}