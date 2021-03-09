## Travel App

This project requires you to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs.


## APIs Used in this project

- [Geonames](https://www.geonames.org/)
- [Weatherbit](https://www.weatherbit.io/api)
- [Pixabay](https://pixabay.com/api/docs/)

## Architecture of the Project

```shell script
- Root:
  - `package.json`
  - `readme.md`
  - `webpack.dev.js`
  - `webpack.prod.js`
  - `.env`
  - src folder
    - client folder
      - `index.js`
      - js folder
        - `app.js` 
        - `dateInputRestricter.js`
        - `endInputHandler.js`
        - `handleDays.js`
        - `returnToday.js`
      - styles folder
        - `style.scss` 
      - views folder
        - `index.html`
    - server folder
      - `server.js`
```


## How to install


1. You will need to create a new `.env` file in the root of your project and store your API keys like so:

```shell script
GN_key = ******************************
WB_key = ******************************
PB_key = ******************************
```

2. Run the following commands:


```shell script
    npm i
    npm run dev
    npm run build
    npm run start
```

To test using Jest, run the following

```shell script
    npm run test
```

## Acknowledgments

This app is the final project for [Udacity](https://www.udacity.com/) **Front End Web Developer Capstone Project**
