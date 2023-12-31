class FilterFormHelper {

    static gameRatingInput(e, handler) {
        const { value } = e.target;
        if ((value >= 1 && value <= 9) || (value === "" || value === null)) handler(e);
        return undefined;
    }

    static playerCountInput(e, handler) {
        const { value } = e.target;
        if ((value >= 1 && value <= 20) || (value === "" || value === null)) handler(e);
        return undefined;
    }    

    static minPlayTimeInput(e, handler, maxPlayTime) {
        const max = maxPlayTime === "" ? 10000 : Number(maxPlayTime);
        const { value } = e.target;
        if ((value >= 1 && value <= max) || (value === "" || value === null)) handler(e);
        return undefined;
    }   

    static maxPlayTimeInput(e, handler, minPlayTime) {
        const min = minPlayTime === "" ? 1 : Number(minPlayTime);
        const { value } = e.target;
        if ((value >= min && value <= 10000) || (value === "" || value === null)) handler(e);
        return undefined;
    }   

    static minWeightInput(e, handler, maxWeightVal) {
        const max = maxWeightVal === "" ? 5 : Number(maxWeightVal);
        const { value } = e.target;
        if ((value >= 0 && value <= max) || (value === "" || value === null)) handler(e);
        return undefined;
    }   

    static maxWeightInput(e, handler, minWeightVal) {
        const min = minWeightVal === "" ? 0 : Number(minWeightVal);
        const { value } = e.target;
        if ((value >= min && value <= 5) || (value === "" || value === null)) handler(e);
        return undefined;
    }   

    static minAgeInput(e, handler) {
        const { value } = e.target;
        if ((value >= 1 && value <= 100) || (value === "" || value === null)) handler(e);
        return undefined;
    }    

}

export default FilterFormHelper;