
import axiosClient from "./axiosClient"


const userApi = {
    register(data) {
        const url = `/register`
        return axiosClient.post(url, data)
    },
    login(data){
        const url='/login'
        return axiosClient.post(url,data)
    },
    update(data,id){
        const url='/user/'+id
        return axiosClient.patch(url,data)
    }
    
}
export default userApi;