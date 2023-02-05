namespace FilesManager.Logic.CosmoDBServices
{
    public interface ICosmosDbService
    {
        Task<IEnumerable<Domain.File>> GetMultipleAsync(string query);
        Task<Domain.File> GetAsync(string id);
        Task AddAsync(Domain.File file);
    }
}
