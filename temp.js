const lat = 1.3521;   // Singapore example
const lon = 103.8198;
const url = `https://seasonal-api.open-meteo.com/v1/seasonal?latitude=${lat}&longitude=${lon}`
            + `&model=SEAS5&variables=precipitation_anomaly,temperature_anomaly`
            + `&forecast_length=7months`;  // or try `&forecast_length=7` if months not accepted

fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log("Seasonal forecast:", data);
  })
  .catch(err => console.error("API error", err));
