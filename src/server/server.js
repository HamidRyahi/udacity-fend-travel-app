const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const fetch = require("node-fetch");
// Require Body-Parser
const bodyParser = require('body-parser');
// Require Cors
const cors = require('cors');
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));
// app.use(express.static('website'));
app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})
// Setup Server

// const port = 8081;
// const server = app.listen(port, () => { console.log(`running on localhost: ${port}`) })


app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});



app.post("/geonames", async (req, res) => {
  console.log('GN request body:', req.body)
  const city = req.body.cityName;
  // console.log("City:", city);
  let url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=${process.env.GN_key}`;
  // console.log('GN url:', url);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
    }
  });
  try {
    const data = await response.json();
    console.log(data.geonames[0].countryCode)
    res.send({
      latitude: data.geonames[0].lat,
      longitude: data.geonames[0].lng,
      country: data.geonames[0].countryName,
      city: data.geonames[0].toponymName,
      countryCode: data.geonames[0].countryCode
    });
  } catch (err) {
    console.log("error", err);
  }
});


app.post("/wbd", async (req, res) => {
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const numOfDays = req.body.days + 1;
  // console.log('WB request body:', req.body)
  console.log(latitude, longitude, numOfDays);
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${process.env.WB_key}&days=${numOfDays}`;
  console.log('WB url:', url);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
    }
  });
  try {
    const data = await response.json();
    console.log('WB data', data.data[numOfDays - 1].low_temp)
    res.send({
      lowTemp: data.data[numOfDays - 1].low_temp,
      maxTemp: data.data[numOfDays - 1].max_temp,
      temp: data.data[numOfDays - 1].temp,
      description: data.data[numOfDays - 1].weather.description,
      date: data.data[numOfDays - 1].valid_date
    });
  } catch (err) {
    console.log("WB error", err);
    res.send({})
  }
});

app.post("/pb", async (req, res) => {
  const city = req.body.cityName;
  const country = req.body.country;
  console.log(city);
  let url = `https://pixabay.com/api/?key=${process.env.PB_key}&q=${city}&image_type=photo`;
  console.log('PB url:', url);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
    }
  });
  try {
    const data = await response.json();
    // console.log(data)
    res.send({
      img: data.hits[0].webformatURL
    });
  } catch (err) {
    console.log("error", err);
    // let url2 = `https://pixabay.com/api/?key=${process.env.PB_key}&q=${country}&image_type=photo`;
    // const response = await fetch(url2, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/JSON",
    //   }
    // });
    // try {
    //   const data = await response.json();
    //   // console.log(data)
    //   res.send({
    //     img: data.hits[0].webformatURL
    //   });
    // } catch (err) {
    //   console.log("error", err);
    // }
    res.send({
      countryFlagsBase: 'https://flagcdn.com/w320/'
    })
  }
});


module.exports = app
