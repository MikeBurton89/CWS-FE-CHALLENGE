export async function geocodeAddress(address) {
    const apiKey = import.meta.env.VITE_GEOCODING_API_KEY; 
    const geocodingEndpoint = `https://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}`;
  
    try {
      const response = await fetch(geocodingEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: {
            city:'Paris',
            street: address,
          },
        }),
      });
  
      if (!response.ok) {
        throw new Error('Geocoding request failed');
      }
  
      const data = await response.json();
      const results = data.results[0].locations;
  
      if (results.length > 0) {
        const { latLng } = results[0];
        return {
          lat: latLng.lat,
          lng: latLng.lng,
        };
      } else {
        throw new Error('No geocoding results found');
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      return null;
    }
  }
  