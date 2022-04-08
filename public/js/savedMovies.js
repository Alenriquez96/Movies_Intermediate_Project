const fetch = require("node-fetch");
require('dotenv').config();

const getFilmInfo = async (id) => {
    try {
      let response = await fetch(`${process.env.GET_INFO_URL}${process.env.API_KEY_MOVIES}/${id}`);//{}
      let filmInfo = await response.json();//{}
      return filmInfo;
    } catch (error) {
      console.log(`ERROR: ${error.stack}`);
      return [];
    }
  }