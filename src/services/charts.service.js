import { BaseService } from "./base.service"
import { ErrorWrapper, ResponseWrapper } from "./utils"

export class ChartsService extends BaseService {
  static async getChartTypeList() {
    try {
      const response = await this.request({ auth: true }).get("chart-types/")
      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async getUserChartList() {
    try {
      const response = await this.request({ auth: true }).get("charts/")
      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async createChart(params) {
    try {
      const response = await this.request({ auth: true }).post(
        "charts/",
        params
      )
      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async updateChart(id, formData) {
    try {
      const response = await this.request({ auth: true }).put(
        `charts/${id}/`,
        formData
      )
      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async getChart(id) {
    try {
      const response = await this.request({ auth: true }).get(`charts/${id}/`)
      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async getDataFileInDict(id) {
    try {
      const response = await this.request({ auth: true }).get(
        `charts/${id}/get_data_file_in_dict/`
      )
      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }
}
