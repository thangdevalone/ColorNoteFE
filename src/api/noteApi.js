
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
    },
    editNote(idNote,param){
        const url = `/notes/${idNote}`
        return axiosClient.patch(url,param)
    },
    tick(idData){
        const url = `/tick/${idData}`
        return axiosClient.patch(url)
    },
    openNote(idNote,data){
        const url = `/open-note/${idNote}`
        return axiosClient.post(url,data)
    }
}
export default noteApi;