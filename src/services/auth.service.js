import axios from "axios"
import Router from "src/router/index.js"
import { Notify } from "quasar"
import { API_URL } from "../env"
import { ErrorWrapper, ResponseWrapper } from "./utils"
import { useUserStore } from "src/stores/user-store"

export class AuthService {
  static async makeLogin({ username, password }) {
    try {
      const response = await axios.post(`${API_URL}/auth/login/`, {
        username,
        password,
      })

      _setAuthData({
        token: response.data.token,
      })

      useUserStore().setUserData(response.data.user)

      Router.push("/")

      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async registerUser({ username, email, password, password2 }) {
    try {
      const response = await axios.post(`${API_URL}/register/`, {
        username: username,
        email: email,
        password: password,
        password2: password2,
      })

      Router.push({ name: "login" })

      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  /**
   * @METHODS
   */

  static setToken(token) {
    localStorage.setItem("token", token)
  }

  static getToken() {
    return localStorage.getItem("token")
  }

  static hasToken() {
    Boolean(localStorage.getItem("token"))
  }

  static resetToken() {
    AuthService.setToken("")
  }

  static resetAuthData() {
    AuthService.resetToken()
    useUserStore().resetUserData()
  }

  static logOutUser(message = null) {
    AuthService.resetAuthData()
    Router.push({ name: "login" })
    Notify.create({
      type: "info",
      message: message || "Logged out",
    })
  }
}

/**
 * @private_methods
 */
function _setAuthData({ token }) {
  AuthService.setToken(token)
}
