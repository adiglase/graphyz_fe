import { BaseService } from "./base.service"
import { ErrorWrapper, ResponseWrapper } from "./utils"

export class UsersService extends BaseService {
  static async getCurrentUser() {
    try {
      const response = await this.request({ auth: true }).get("user/me")
      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }
}
