/**
 * doc: https://cloud.google.com/generative-ai-app-builder/docs/preview-search-results?hl=ko
 */
// const projectId = 'YOUR_PROJECT_ID';
const location = 'global';              // Options: 'global', 'us', 'eu'
// const collectionId = 'default_collection';     // Options: 'default_collection'
// const dataStoreId = 'YOUR_DATA_STORE_ID'       // Create in Cloud Console
// const servingConfigId = 'default_config';      // Options: 'default_config'
// const searchQuery = 'G80 지능형 속도 제한 이상 및 제한 사항';

const {SearchServiceClient} = require('@google-cloud/discoveryengine').v1beta;

// For more information, refer to:
// https://cloud.google.com/generative-ai-app-builder/docs/locations#specify_a_multi-region_for_your_data_store
const apiEndpoint =
  location === 'global'
    ? 'discoveryengine.googleapis.com'
    : `${location}-discoveryengine.googleapis.com`;

// Instantiates a client
const client = new SearchServiceClient({apiEndpoint: apiEndpoint});

async function search(searchQuery) {
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
    pageSize: 10,
    query: searchQuery,
    servingConfig: engineName,
    session: "projects/79005562778/locations/global/collections/default_collection/engines/42dot-enterprise-search_1743568847658/sessions/5977228923869734853"
  };

  const IResponseParams = {
    ISearchResult: 0,
    ISearchRequest: 1,
    ISearchResponse: 2,
  };

  // Perform search request
  const response = await client.search(request, {
    // Warning: Should always disable autoPaginate to avoid iterate through all pages.
    //
    // By default NodeJS SDK returns an iterable where you can iterate through all
    // search results instead of only the limited number of results requested on
    // pageSize, by sending multiple sequential search requests page-by-page while
    // iterating, until it exhausts all the search results. This will be unexpected and
    // may cause high Search API usage and long wait time, especially when the matched
    // document numbers are huge.
    autoPaginate: false,
  });
  const results = response[IResponseParams.ISearchResponse].results;

//   for (const result of results) {
//     console.log(JSON.stringify(result, null, 2));
//   }
    console.log(JSON.stringify(results, null, 2))
}

search('G80 지능형 속도 제한 이상 및 제한 사항');