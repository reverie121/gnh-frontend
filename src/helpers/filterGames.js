import { gameListFromLocal } from "../helpers/localStorageHelper";

const filterGames = (formData, checkboxes) => {
    // Initialize list from local storage for filtering.
    let listToFilter = gameListFromLocal();
    // Filter by title, as required.
    if (formData.gameTitle) {
        listToFilter = listToFilter.filter(g => 
            Array.isArray(g.name) ? 
            g.name[0]._attributes.value.toLowerCase().includes(formData.gameTitle.toLowerCase())
            : 
            g.name._attributes.value.toLowerCase().includes(formData.gameTitle.toLowerCase())
        );
    };
    // Filter by minimum rating, as required.
    if (formData.gameRating) listToFilter = listToFilter.filter(g => Number(g.statistics.ratings.average._attributes.value).toFixed(1) >= formData.gameRating);      
    // Filter by player count, as required.
    if (formData.playerCount) {
        // Filter logic for official player count.
        if (checkboxes.playerCountOfficial === true) listToFilter = listToFilter.filter(g => Number(g.minplayers._attributes.value) <= formData.playerCount && formData.playerCount <= Number(g.maxplayers._attributes.value))
        // Filter logic for user-voted player count ratings.
        if (checkboxes.playerCountBest === true && checkboxes.playerCountRecommended === true) {
            listToFilter = listToFilter.filter(g => 
                g.poll[0].results.length >= formData.playerCount 
                && 
                (Number(g.poll[0].results[Number(formData.playerCount)-1].result[0]._attributes.numvotes) 
                >= 
                Number(g.poll[0].results[Number(formData.playerCount)-1].result[2]._attributes.numvotes) 
                ||  
                Number(g.poll[0].results[Number(formData.playerCount)-1].result[1]._attributes.numvotes) 
                >= 
                Number(g.poll[0].results[Number(formData.playerCount)-1].result[2]._attributes.numvotes)) 
                && 
                (Number(g.poll[0].results[Number(formData.playerCount)-1].result[0]._attributes.numvotes) >= 1 
                || 
                Number(g.poll[0].results[Number(formData.playerCount)-1].result[1]._attributes.numvotes) >= 1)
            )
        } 
        else if (checkboxes.playerCountBest === true) {
            listToFilter = listToFilter.filter(g => 
                g.poll[0].results.length >= formData.playerCount 
                && 
                Number(g.poll[0].results[Number(formData.playerCount)-1].result[0]._attributes.numvotes) 
                >= 
                Number(g.poll[0].results[Number(formData.playerCount)-1].result[1]._attributes.numvotes) 
                &&   
                Number(g.poll[0].results[Number(formData.playerCount)-1].result[0]._attributes.numvotes) 
                >= 
                Number(g.poll[0].results[Number(formData.playerCount)-1].result[2]._attributes.numvotes) 
                && 
                Number(g.poll[0].results[Number(formData.playerCount)-1].result[0]._attributes.numvotes) >= 1 
            )
        }
        else if (checkboxes.playerCountRecommended === true) {
            listToFilter = listToFilter.filter(g => 
                g.poll[0].results.length >= formData.playerCount 
                && 
                Number(g.poll[0].results[Number(formData.playerCount)-1].result[1]._attributes.numvotes) 
                > 
                Number(g.poll[0].results[Number(formData.playerCount)-1].result[0]._attributes.numvotes) 
                &&   
                Number(g.poll[0].results[Number(formData.playerCount)-1].result[1]._attributes.numvotes) 
                >= 
                Number(g.poll[0].results[Number(formData.playerCount)-1].result[2]._attributes.numvotes) 
                && 
                Number(g.poll[0].results[Number(formData.playerCount)-1].result[1]._attributes.numvotes) >= 1 
            )                
        }
    }
    // Filter by minimum play time, as required.
    if (formData.minPlayTime) listToFilter = listToFilter.filter(g => Number(g.minplaytime._attributes.value) >= formData.minPlayTime);  
    // Filter by maximum play time, as required.
    if (formData.maxPlayTime) listToFilter = listToFilter.filter(g => Number(g.maxplaytime._attributes.value) <= formData.maxPlayTime);         
    // Filter by minimum weight, as required.
    if (formData.minWeight) listToFilter = listToFilter.filter(g => g.statistics.ratings.averageweight._attributes.value >= formData.minWeight);  
    // Filter by maximum weight, as required.
    if (formData.maxWeight) listToFilter = listToFilter.filter(g => g.statistics.ratings.averageweight._attributes.value <= formData.maxWeight);           
    // Filter by minimum age, as required.
    if (formData.minAge) {
        // Filter logic for official minimum age.
        if (checkboxes.publisherMinAge === true) listToFilter = listToFilter.filter(g => g.minage._attributes.value !== "0" && Number(g.minage._attributes.value) <= formData.minAge);     
        // Filter logic for community voted minimum age.
        if (checkboxes.communityMinAge === true) listToFilter = listToFilter.filter(g => g.poll[1]._attributes.totalvotes !== "0" && Number(g.poll[1].resultSummary) <= formData.minAge);
    }

    // Return filtered list.
    return listToFilter;
}

export default filterGames;