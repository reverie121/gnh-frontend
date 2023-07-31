import { xml2json } from "xml-js";

import GameNightBGGHelperAPI from "../api/bgg-api";
import getBGGGameData from "./getBGGGameData";
import { bggUserToLocal } from "./localStorageHelper";

const getBGGUserData = async (bggUsername) => {
    const [ userDataRes, userCollectionRes, userWishListRes, userWantToPlayListRes, userPlaysData ] = await Promise.all([
        GameNightBGGHelperAPI.getUser(bggUsername),
        GameNightBGGHelperAPI.getCollection(bggUsername),
        GameNightBGGHelperAPI.getWishlist(bggUsername),
        GameNightBGGHelperAPI.getWantToPlayList(bggUsername),
        GameNightBGGHelperAPI.getPlays(bggUsername)
    ]);

    const userDetails = JSON.parse(xml2json(userDataRes, { compact: true, spaces: 2 }));

    const userCollectionData =  JSON.parse(xml2json(userCollectionRes, { compact: true, spaces: 2 }));
    let userCollectionIDs = [];
    if (Array.isArray(userCollectionData.items.item)) {
        Object.values(userCollectionData.items.item).map(g => userCollectionIDs.push(g._attributes.objectid));    
    }

    const userWishListData =  JSON.parse(xml2json(userWishListRes, { compact: true, spaces: 2 }));
    let userWishListIDs = [];
    if (Array.isArray(userWishListData.items.item)) {
        Object.values(userWishListData.items.item).map(g => userWishListIDs.push(g._attributes.objectid));  
    }
    
    const userWantToPlayListData =  JSON.parse(xml2json(userWantToPlayListRes, { compact: true, spaces: 2 })); 
    let userWantToPlayListIDs = [];
    if (Array.isArray(userWantToPlayListData.items.item)) {
        Object.values(userWantToPlayListData.items.item).map(g => userWantToPlayListIDs.push(g._attributes.objectid));
    }

    const userPlays = JSON.parse(xml2json(userPlaysData, { compact: true, spaces: 2 }));
    let userPlayIDs = [];
    if (userPlays.plays._attributes.total !== "0") {
        console.log(`it's an array!!!`)
        Object.values(userPlays.plays.play.map(p => userPlayIDs.push(p.item._attributes.objectid)));
    }

    const userGames = await getBGGGameData(bggUsername, "user", userPlayIDs)

    let bggUser = {
        userDetails,
        userGames,
        userCollectionIDs,
        userWishListIDs,
        userWantToPlayListIDs,        
        userPlays
    };

    bggUserToLocal(bggUser);

    return(bggUser);
};

export default getBGGUserData;