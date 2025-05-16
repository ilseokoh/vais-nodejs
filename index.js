// Imports the Discoveryengine library
const {EngineServiceClient, DataStoreServiceClient} = require('@google-cloud/discoveryengine').v1;

// Instantiates a client
  const discoveryengineClient = new EngineServiceClient();
  const dataStoreClient = new DataStoreServiceClient();
  const searchClient = new SearchServiceClient();

  async function callGetEngine() {
    // Construct request
    const request = {
      parent: "projects/79005562778/locations/global/collections/default_collection",
      pageSize: 10
    };

    // Run request
    const iterable = discoveryengineClient.listEnginesAsync(request);
    for await (const response of iterable) {
        console.log(response);
    }
  }

async function callListDataStores() {
    // Construct request
    const request = {
      parent: "projects/79005562778/locations/global/collections/default_collection",
    };

    // Run request
    const iterable = dataStoreClient.listDataStoresAsync(request);
    for await (const response of iterable) {
        console.log(response);
    }
  }

async function getDataStore() {
    const request = {
        name: "projects/79005562778/locations/global/collections/default_collection/dataStores/genesis-g80-manual_1743645284160_gcs_store"
    }; 

    // Run request
    const response = await dataStoreClient.getDataStore(request);
    console.log(response);
}


  async function callSearch() {
    // Construct request
    const request = {
      servingConfig,
    };

    // Run request
    const iterable = searchClient.searchAsync(request);
    for await (const response of iterable) {
        console.log(response);
    }
  }

  getDataStore();
