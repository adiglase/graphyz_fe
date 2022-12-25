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
}
