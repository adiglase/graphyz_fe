import { api } from "src/boot/axios"
import { AuthService } from "./auth.service"
import { ErrorWrapper } from "./utils"

export class Http {
  constructor(status) {
    // if auth = true means that this http call need authentication credential
    this.isAuth = status && status.auth ? status.auth : false
    this.instance = api
    return this.init()
  }

  init() {
    if (this.isAuth) {
      this.instance.interceptors.request.use(
        (request) => {
          request.headers.Authorization = `Token ${AuthService.getToken()}`
          return request
        },
        (error) => {
          return Promise.reject(error)
        }
      )

      this.instance.interceptors.response.use(
        (response) => response,
        (error) => {
          // if unauthorized
          if (error.response.status === 401) {
            AuthService.logOutUser("Please Sign In")
            throw new ErrorWrapper(error)
          }
        }
      )
    }

    return this.instance
  }
}
