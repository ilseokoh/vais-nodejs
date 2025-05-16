/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const projectId = 'YOUR_PROJECT_ID';
const location = 'global';              // Options: 'global', 'us', 'eu'
// const collectionId = 'default_collection';     // Options: 'default_collection'
// const dataStoreId = 'YOUR_DATA_STORE_ID'       // Create in Cloud Console
// const servingConfigId = 'default_config';      // Options: 'default_config'
// const searchQuery = 'G80 지능형 속도 제한 이상 및 제한 사항';

const {ConversationalSearchServiceClient} = require('@google-cloud/discoveryengine').v1;

// For more information, refer to:
// https://cloud.google.com/generative-ai-app-builder/docs/locations#specify_a_multi-region_for_your_data_store
const apiEndpoint =
  location === 'global'
    ? 'discoveryengine.googleapis.com'
    : `${location}-discoveryengine.googleapis.com`;

// Instantiates a client
const client = new ConversationalSearchServiceClient({apiEndpoint: apiEndpoint});

async function answer(searchQuery) {
  // The full resource name of the search engine serving configuration.
  // Example: projects/{projectId}/locations/{location}/collections/{collectionId}/dataStores/{dataStoreId}/servingConfigs/{servingConfigId}
  // You must create a search engine in the Cloud Console first.

  const engineName = client.projectLocationCollectionEngineServingConfigPath(
    "agentspace-42dot-poc",
    location,
    "default_collection",
    "42dot-enterprise-search_1743568847658",
    "default_config"
  )

  const request = {
    
    query: searchQuery,
    servingConfig: engineName,
  };

  // Perform search request
  const response = await client.answerQuery(request);
  //const result = response[IResponseParams.ISearchResponse].results;
  console.log(JSON.stringify(response, null, 2));
  
}

answer('G80 지능형 속도 제한 이상 및 제한 사항');