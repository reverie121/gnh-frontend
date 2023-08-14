import React from "react";

import FilterForm from "./FilterForm";

import SortingForm from "./SortingForm";

import CollectionRequestContainer from "./CollectionRequestContainer"

function CollectionInputsBox() {

    return(
        <div>
            <FilterForm />
            <SortingForm />
            <CollectionRequestContainer />
        </div>
    );
};

export default CollectionInputsBox;