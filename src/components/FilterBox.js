import React from "react";

import FilterForm from "./FilterForm";

import CollectionRequestContainer from "./CollectionRequestContainer"

function FilterBox() {

    return(
        <div>
            <FilterForm />
            <CollectionRequestContainer />
        </div>
    );
};

export default FilterBox;