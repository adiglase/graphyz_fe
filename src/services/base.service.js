import { Http } from "./http.init";
import { ErrorWrapper, ResponseWrapper } from "./utils";

export class BaseService {
  static request(status = { auth: false }) {
    return new Http(status);
  }

  static responseWrapper(...rest) {
    return new ResponseWrapper(...rest);
  }

  static errorWrapper(...rest) {
    return new ErrorWrapper(...rest);
  }
}
