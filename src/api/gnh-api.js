import axios from "axios";

import { userFromLocal } from "../helpers/localStorageHelper";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class GameNightHelperAPI {
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    // the token for interactive with the API will be stored here.
    const { token } = userFromLocal()

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // USER API Routes

  /** Register a new user. */

  static async registerUser(data) {
    const res = await this.request(`auth/register`, data, "post");
    return res.token;
  }  

  /** Login in a user, returning a token. */

  static async loginUser(data) {
    const res = await this.request(`auth/token`, data, "post");
    return res.token
  }

  /** Get details on a user by username. */

  static async getUser(username) {
    const [userRes, quickFilterRes] = await Promise.all([
      this.request(`users/${username}`),
      this.request(`quick-filters/user/${username}`)
    ])
    const userData = userRes.user;
    userData.quickFilters = quickFilterRes.quickFilters || [];
    return userData;
  }

  /** Edit user details. */

  static async editUser(data) {
    const {username, ...userData} = data;
    const res = await this.request(`users/${username}`, userData, "patch");
    return res.user;
  }  
  
  // Quick Filter API Routes

  static async getQuickFilters(username) {
    const res = await this.request(`quick-filters/user/${username}`);
    return res.quickFilters;
  }

  static async removeQuickFilter(id) {
    const res = await this.request(`quick-filters/id/${id}`, {}, "delete");
    return res;
  }

  static async saveQuickFilter(data) {
    const res = await this.request(`quick-filters/`, data, "post");
    return res.quickFilter;
  }

  // BGG Data API Routes

  /** Get a simple BGG collection by BGG username. */

  static async getBGGCollection(bggUsername) {
    const res = await this.request(`bgg/collection/${bggUsername}`);
    return res.collection;
  }

  /** Get user data by BGG username. */

  static async getBGGUser(bggUsername) {
    const res = await this.request(`bgg/user/${bggUsername}`);
    // Convert game ID arrays to sets for fast filtering of userGames.
    const idLists = ['userCollectionIDs', 'userPreviouslyOwnedIDs', 'userForTradeIDs', 'userWantIDs', 'userWantToPlayIDs', 'userWantToBuyIDs', 'userPreOrederedIDs']
    for (const idList of idLists) {
      if (Array.isArray(res.userData[idList])) res.userData[idList] = new Set(res.userData[idList]);
    }

    return res.userData;
  }

}

export default GameNightHelperAPI;