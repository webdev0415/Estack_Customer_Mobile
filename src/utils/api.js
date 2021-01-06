const API_URL = 'YOUR_SERVER_ADDRESS';

let accessToken = null;
let refreshToken = null;

const fetchAsync = async (url, {method = 'GET', body, headers = {}}) => {
  // await response of fetch call
  try {
		const requestHeaders = {
			...headers,
			token: accessToken,
			method,
		};
	
    let response = await fetch(url, { headers: requestHeaders, body });

    if (response && response.status === 403) {
			headers.token = refreshToken;
			
			response = await fetch(url, { headers });
    }
    // only proceed once promise is resolved
    const data = await response.json();
    // only proceed once second promise is resolved
    return data;
  } catch (e) {
    console.error(e);
  }
}

export const setAuthToken = (token) => {
  accessToken = token;
};

export const resetAuthToken = () => {
  accessToken = null;
};

export const setRefreshToken = (token) => {
  refreshToken = token;
};

export const resetRefreshToken = () => {
  refreshToken = null;
};

export const get = async (endpoint, query) => {
	let url = `${API_URL}/${endpoint}`;

	if (query) {
		url += '?';

		for (const [key, value] of Object.entries(query)) {
			url += `${encodeURI(key)}=${encodeURI(value)}`;
		}
	}

	return await fetchAsync(url);
};

export const post = async (endpoint, body) => {
	let url = `${API_URL}/${endpoint}`;

	return await fetchAsync(url, {method: 'POST', body});
};

export const put = async (endpoint, body) => {
	let url = `${API_URL}/${endpoint}`;

	return await fetchAsync(url, {method: 'PUT', body});
};