const user_day=document.getElementById("date-inputbox");
const loc=document.getElementById("location-inputbox");
const predictButton=document.getElementById("search-btn");
const resultdiv=document.getElementById("crops-result");

const predict_weather=async(arr)=>{
const {latitude,longitude}=arr;
const url =`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
            `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum` +
            `&forecast_days=16&timezone=auto`;

const response=await fetch(url);
const data=await response.json();
const tempMax = data.daily.temperature_2m_max[0];
const tempMin = data.daily.temperature_2m_min[0];
const precipitation = data.daily.precipitation_sum[0];
const day=data.daily.time;

if(day.includes(user_day.value))
resultdiv.textContent=`Day: ${user_day.value}, Max Temp: ${tempMax} °C, Min Temp: ${tempMin} °C, Precipitation: ${precipitation} mm`;

else
resultdiv.textContent=`Date not available in forecast`;
}

async function extract_degree(location) {
 //steps of API calling--
 //step1: Set Url
 //step2: Use fetch() to call API
 //step3: store the response in a variable
 //step4: convert it into json format

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${location}`;
  const response = await fetch(url);
  const data = await response.json();

  const degree_details=data.results[0];
  //const lat=degree_details['latitude'];
  //const long=degree_details['longitude'];
  const {latitude, longitude}=degree_details;
  return {latitude,longitude };
}

predictButton.addEventListener("click",async()=>{

 const arr=await extract_degree(loc.value);
 predict_weather(arr);
 console.log(arr); //shows promise pending here.

});