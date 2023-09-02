import React from "react";

import FilterForm from "./FilterForm";
import CollectionRequestContainer from "./CollectionRequestContainer"

function CollectionInputsBox() {

    return(
        <div>
            <FilterForm />
            <CollectionRequestContainer />
        </div>
    );
};

export default CollectionInputsBox;