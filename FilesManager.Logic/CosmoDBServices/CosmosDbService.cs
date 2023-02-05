using Microsoft.Azure.Cosmos;
using FilesManager.Domain;

namespace FilesManager.Logic.CosmoDBServices
{
    public class CosmosDbService : ICosmosDbService
    {
        private readonly Container _container;
        public CosmosDbService(
            CosmosClient cosmosDbClient,
            string databaseName,
            string containerName)
        {
            _container = cosmosDbClient.GetContainer(databaseName, containerName);
        }

        public async Task<IEnumerable<Domain.File>> GetMultipleAsync(string queryString)
        {
            var query = _container.GetItemQueryIterator<Domain.File>(new QueryDefinition(queryString));
            var results = new List<Domain.File>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }
            return results;
        }

        public async Task<Domain.File> GetAsync(string id)
        {
            try
            {
                var response = await _container.ReadItemAsync<Domain.File>(id, new PartitionKey(id));
                return response.Resource;
            }
            catch (CosmosException)
            {
                return null;
            }
        }

        public async Task AddAsync(Domain.File file)
        {
            await _container.CreateItemAsync(file, new PartitionKey(file.Id));
        }
    }
}
