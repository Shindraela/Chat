/*
Service definition
*/
const sendBodyError = (response, errorMessage) => {
    return response.json({
        message: errorMessage,
        err: null,
        data: null,
    });
}

const sendFieldsError = (response, errorMessage, miss, extra) => {
    return response.json({
        message: errorMessage,
        err: { miss, extra },
        data: null,
    });
}

const sendApiSuccessResponse = (response, successMessage, data) => {
    return response.send({
        message: successMessage,
        err: null,
        data: data,
    })
}

const sendApiErrorResponse = (response, errorMessage, error) => {
    return response.json({
        message: errorMessage,
        error,
        data: null,
    });
}
// 


/*
Export service fonctions
*/
module.exports = {
sendBodyError,
sendFieldsError,
sendApiSuccessResponse,
sendApiErrorResponse
};
//