import React from "react";

import './css/ProcessResponseMessage.css';

function ProcessResponseMessage( { processIs } ) {
    if (processIs === 'idle') return <span />;
    let message;
    if (processIs === 'pending') {
        message = "Submitting changes..."
    } else if (processIs === 'success') {
        message = "Updated successfully!"
    } else if (processIs === 'failure') {
        message = "Update unsuccessful."
    }
    return(
        <div className={`ProcessResponseMessage ${processIs}`}>
            {message}
        </div>
    )
}

export default ProcessResponseMessage;
