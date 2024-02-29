class ApiError {
    constructor(statusCode, data, message="Something went wrong"){
        this.statusCode = statusCode,
        this.data = data,
        this.message = message,
        this.isError = statusCode>=300
    }
}
module.exports = {ApiError};