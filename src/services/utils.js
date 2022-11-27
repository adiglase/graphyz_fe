// import forEach from "lodash/forEach";
// import isArray from "lodash/isArray";

/**
 * Return message for HTTP status code
 * @param {number} status - HTTP status code
 * @returns {string} Message of network operation
 */
function _getStatusMessage(status) {
  let message = ""
  switch (status) {
    case 200:
      message = "All done. Request successfully executed"
      break
    case 201:
      message = "Data successfully created"
      break
    case 400:
      message = "Bad Request"
      break
    case 401:
      message = "Need auth"
      break
    case 404:
      message = "Not found"
      break
    case 503:
      message = "Service unavailable. Try again later"
      break
    default:
      message = "Something wrong. Client default error message"
      break
  }
  return message
}

function _getResponseErrorMessage(error) {
  if (error.response && error.response.data) {
    if (error.response.data.detail) return error.response.data.detail

    return error.response.data
  }
  if (error.response && error.response.statusText)
    return error.response.statusText
  return error.message === "Network Error"
    ? "Oops! Network Error. Try again later"
    : error.message
}

/**
 * Create instance, which represent response object
 * @param {Object} [data] - custom data
 * @param {Object} [response] - axios response object
 * @param {String} [message] - custom message to display
 */
export class ResponseWrapper {
  constructor(response, data = {}, message) {
    this.data = data
    this.success = response.data.success
    this.status = response.status
    this.statusMessage = _getStatusMessage(this.status)
    this.message = message || null
  }
}

/**
 * Create instance, which represent error object
 * @param {Object} [error] - axios error object
 * @param {String} [message] - custom message to display
 */
export class ErrorWrapper extends Error {
  constructor(error, message) {
    super()
    this.success = error.response ? error.response.data.success : false
    this.meta = error.response ? error.response.data.meta : false
    this.code = error.response ? error.response.data.code : false
    this.status = error.response ? error.response.status : false
    this.statusMessage = _getStatusMessage(this.status)
    this.message = message || _getResponseErrorMessage(error)
  }
}

/**
 * Serialize the errors that comes from BE to differentiate between
 * the field errors (errors with key), the non field error and text error
 * @param {Object} errors objects errors from backend
 */
export const serializeBEError = (errors) => {
  let fieldErrors = {}
  let nonFieldErrors = ""
  let textError = ""
  if (typeof errors === "object" && !Array.isArray(errors)) {
    // if errors is an object, assign the value of non_field_errors key to the
    // nonFieldErrors variable, and the other key to the fieldErrors variable
    ;({ non_field_errors: nonFieldErrors = "", ...fieldErrors } = errors)
  }

  if (Array.isArray(errors)) {
    textError = errors.join(", ")
  } else if (typeof errors === "string") {
    // if the error is string, then treat it as a text errors
    textError = errors
  }

  return [fieldErrors, nonFieldErrors, textError]
}

/**
 * Uses to clear request data before send it
 * Client shouldn't change entity id
 * @param data
 * @return {{}}
 */
// export function clearData (data) {
//   const result = {}
//   forEach(data, (item, propName) => {
//     if (isArray(item) && item.length) {
//       result[propName] = item
//     }
//     if (!isArray(item) && item && (propName !== 'id')) {
//       result[propName] = item
//     }
//   })
//   return result
// }
