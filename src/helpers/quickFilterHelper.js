const filterDictionary = {
        gameTitle: "Title",
        gameRating: "Min. Rating",
        playTime: "Play Time",
        playerCount: "Player Count",
        playerCountOfficial: "Publisher",
        playerCountBest: "Best",
        playerCountRecommended: "Recommended",
        minWeight: "Min. Weight",
        maxWeight: "Max. Weight",
        minAge: "Min. Player Age",
        publisherMinAge: "Publisher",
        communityMinAge: "Community",
        primary: "Sort by",
        secondary: "Then by"
}

// Creates an array of active filter descriptions.
function listFilters(formData, checkboxes, selections) {
    let filterList = []
    for (const [k,v] of Object.entries(formData)) {
        // Iterate through the formData and push active filter descriptions to the array.
        if (v !== "") {
            let str = `${filterDictionary[k]}: ${v}`;
            // Include checkbox data for the Player Count filter.
            if (k === 'playerCount') {
                for (const c of ['playerCountOfficial', 'playerCountBest', 'playerCountRecommended']) {
                    if (checkboxes[c]) str = str + ` (${filterDictionary[c]})`;
                }
            }
            // Include checkbox data for the Min. Age filter.
            else if (k === "minAge") {
                for (const c of ["publisherMinAge", "communityMinAge"]) {
                    if (checkboxes[c]) str = str + ` (${filterDictionary[c]})`;
                }
            }
            filterList.push(str);
        }
    }
    for (const s of ['primary', 'secondary']) {
        // Iterate through the sorting data and add active sorts to the array.
        if (selections[s] !== "") {
            const whichSort = filterDictionary[s];
            const sortBy = `${selections[s].slice(0,1).toUpperCase()}${selections[s].slice(1)}`;
            const direction = selections[`${s}Direction`];
            filterList.push(`${whichSort} ${sortBy} (${direction})`);
        }
    }
    return filterList;
}

export default listFilters;