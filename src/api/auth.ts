import { instance } from "./axios.instance"
import { GlobalAdminAuthType } from "../ts/types/auth.types"

export const authAPI = {
  authAdmin: async (adminAuthBody: GlobalAdminAuthType) => {
    try {
      return await instance.post('/account/login', adminAuthBody)
    } catch (error: any) {
      throw error.response
    }
  }
}