const { StatusCodes } = require("http-status-codes");
class CustomAPIError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

module.exports = CustomAPIError;
