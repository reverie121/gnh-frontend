import GameNightBGGHelperAPI from "../api/bgg-api";

const convert = require("xml-js");

const getGameData = async (gameIDArray) => {
    // Get a set (exclude duplicates) of IDs from collection.
    const idSet = new Set(gameIDArray);
    // Convert id set into a comma-separated string for request.
    const idList = [...idSet].join(",");
    // Make request for game details for all unique games in collection.
    const res2 = await GameNightBGGHelperAPI.getGameData(idList);
    const data2 = JSON.parse(
        convert.xml2json(res2, { compact: true, spaces: 2 })
    );
    const gameData = data2.items.item

    return gameData;
}

const getBGGGameData = async (bggUsername, mode="collection", playsIDs) => {

    let gameIDArray = [];
    
    function getIDArrayFromCollection(res) {
        const collectionData = JSON.parse(
            convert.xml2json(res, { compact: true, spaces: 2 })
        );
        if (Array.isArray(collectionData.items.item)) {
            Object.values(collectionData.items.item).map(g => gameIDArray.push(g._attributes.objectid));
        }
    }
    
    if (mode === "user") {
        const [ collectionRes, WishlistRes, WantToPlayRes ] = await Promise.all([
            GameNightBGGHelperAPI.getCollection(bggUsername), 
            GameNightBGGHelperAPI.getWishlist(bggUsername), 
            GameNightBGGHelperAPI.getWantToPlayList(bggUsername), 
        ])
        getIDArrayFromCollection(collectionRes);
        getIDArrayFromCollection(WishlistRes);
        getIDArrayFromCollection(WantToPlayRes);
        gameIDArray.push(...playsIDs);                   
    } else {
        // Make request for collection data.
        const res = await GameNightBGGHelperAPI.getCollection(bggUsername);
        getIDArrayFromCollection(res);
    }

    const gameData = await getGameData(gameIDArray);

    return(gameData);
};

export default getBGGGameData;