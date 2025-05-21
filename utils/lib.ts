const username = process.env.NEXT_PUBLIC_API_USERNAME;
const password = process.env.NEXT_PUBLIC_API_PASSWORD;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const base64Credentials = btoa(username + ':' + password);

const baseHeaders = {
  'Authorization': `Basic ${base64Credentials}`,
  'Content-Type': 'application/json',
};

export async function getCreditTokens() {
  try {
    const response = await fetch(`${apiUrl}/api/v1/creditTokens`, {
      method: 'GET',
      headers: baseHeaders,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching credit tokens:', error);
    throw error;
  }
}

getCreditTokens()


export async function getTSEsForToken(tokenId: string) {
  try {
    const response = await fetch(
      `${apiUrl}/api/v1/creditTokens/${tokenId}/tses`,
      {
        method: 'GET',
        headers: baseHeaders,
      }
    );

    if (!response.ok) {
      console.warn(`TSE fetch failed for token ${tokenId}`);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching TSEs for token ${tokenId}:`, error);
    return [];
  }
}

export async function getTSEsTokenData(tseSerialNumber: string) {
  try {
    const response = await fetch(
      `${apiUrl}/api/v1/tses/${tseSerialNumber}`,
      {
        method: 'GET',
        headers: baseHeaders,
      }
    );

    if (!response.ok) {
      console.warn(`TSE data fetch failed for TSE ${tseSerialNumber}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching TSE data for ${tseSerialNumber}:`, error);
    return null;
  }
}
