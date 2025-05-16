import axios from 'axios';
//import childProcess from 'child_process'; // 개발할 때만 가능한 방법
import { GoogleAuth } from 'google-auth-library'   

// async function getAuthToken() {
//   return new Promise((resolve, reject) => {
//     childProcess.exec('gcloud auth print-access-token', (error, stdout, stderr) => {
//       if (error) {
//         console.error(`Error: ${error.message}`);
//         reject(error);
//         return;
//       }
//       if (stderr) {
//         console.error(`Stderr: ${stderr}`);
//         reject(new Error(stderr));
//         return;
//       }
//       resolve(stdout.trim());
//     });
//   });
// }

async function getAuthToken() {
  try {
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'], // Specify the required scopes
    });

    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();

    // console.log('Access Token:', accessToken.token);
    return accessToken.token;

  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
}

async function callApi(url, options = {}) {
  try {
    const response = await axios(url, options);
    return response.data.name; // Return only the response data
  } catch (error) {
    // Handle errors appropriately, e.g., log them or re-throw with a more specific message
    console.error('API call failed:', error);
    throw new Error(`API call failed: ${error.message}`);
  }
}

const name = "projects/79005562778/locations/global/collections/default_collection/engines/42dot-enterprise-search_1743568847658/sessions";
const url = `https://discoveryengine.googleapis.com/v1/${name}`;
const token = await getAuthToken();
//console.log(token)
const options = {
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    // post 로 넘길 body 
    data: {
        "userPseudoId": "kevin user"
    }
    
}

const result = await callApi(url,options)
console.log(result)