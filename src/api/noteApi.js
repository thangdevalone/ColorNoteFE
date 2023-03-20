
import axiosClient from "./axiosClient"


const noteApi = {
    createNote(idUser, data) {
        const url = `/notes/${idUser}`
        return axiosClient.post(url, data)
    },
    getNotes(idUser) {
        const url = `/notes/${idUser}`
        return axiosClient.get(url)
    }
}
export default noteApi;