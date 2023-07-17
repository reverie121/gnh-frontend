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
      return (await axios({ url, method })).data;
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
    if (res.statusCode === 202) {
      setTimeout(() => {
        this.getCollection(username);
      }, 1000)
    console.log(res)
    }
    console.log(res)
    return res;
  }

    /** Get a game. */

    static async getGame(id) {
      let res = await this.request(`thing?id=${id}`);
      console.log(res)
      if (!res) {
        setTimeout(() => {
          this.getGame(id);
        }, 1000)
      }
      return res;
    }
  
}

export default GameNightBGGHelperAPI;