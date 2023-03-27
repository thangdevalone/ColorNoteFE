
import axiosClient from "./axiosClient"


const noteApi = {
    createNote(idUser, data) {
        const url = `/notes/${idUser}`
        return axiosClient.post(url, data)
    },
    getNotes(idUser) {
        const url = `/notes/${idUser}`
        return axiosClient.get(url)
    },
    delTruncNote(idNote){
        const url = `/trunc-notes/${idNote}`
        return axiosClient.delete(url)

    },
    delMoveTrash(idNote){
        const url = `/notes/${idNote}`
        return axiosClient.delete(url)
    },
    getTrash(idUser){
        const url = `/trash/${idUser}`
        return axiosClient.get(url)
    },
    restoreTrash(idNote){
        const url = `/trash-res/${idNote}`
        return axiosClient.post(url)
    }
    
}
export default noteApi;