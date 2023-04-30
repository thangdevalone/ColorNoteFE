
import axiosClient from "./axiosClient"


const groupApi = {
    createGroup(data){
        const url = `/group/create`
        return axiosClient.post(url, data)
    }
}
export default groupApi;