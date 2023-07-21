import React from "react";

import '../css/ProcessResponseMessage.css';

function ProcessResponseMessage( { processIs } ) {
    if (processIs === 'idle') return <span />;
    let message;
    if (processIs === 'pending') {
        message = "Waiting for data..."
    } else if (processIs === 'success') {
        message = "Operation Successful!"
    } else if (processIs === 'failure') {
        message = "Operation Unsuccessful."
    }
    return(
        <div className={`ProcessResponseMessage ${processIs}`}>
            {message}
        </div>
    )
}

export default ProcessResponseMessage;
