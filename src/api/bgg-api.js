import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "https://boardgamegeek.com/xmlapi2";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class GameNightBGGHelperAPI {

  static async request(endpoint, data = {}, method = "get") {
    console.debug("BGG API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    try {
      return await axios({ url, method });
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // COLLECTION API Routes

  /** Get a collection. */

  static async getCollection(username) {
    let res = await this.request(`collection?username=${username}&excludesubtype=boardgameexpansion&own=1`);
    if (res.status === 202) {
      setTimeout(() => {
        console.debug('Response in queue. Repeating request after 1 second.');
        this.getCollection(username);
      }, 20000)
    } else {
      console.debug('Collection data received.')
      return res.data;
    }
  }

    /** Get a game. */

    static async getGame(id) {
      console.debug('Requesting detailed game/s data.');
      let res = await this.request(`thing?id=${id}&stats=1`);
      return res.data;
    }
  
}

export default GameNightBGGHelperAPI;