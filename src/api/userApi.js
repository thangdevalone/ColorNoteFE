
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
    },
    delete(id,data){
        const url='/user/'+id
        return axiosClient.post(url,data)
    },
    getAll(){
        const url='/allUsers'
        return axiosClient.get(url)
    }
}
export default userApi;