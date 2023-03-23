import StorageKeys from "./storage-keys";
import jwt_decode from 'jwt-decode';
export function checkJWT(){
    let isExpried=true
    let token = localStorage.getItem(StorageKeys.TOKEN) || "";
    if (Boolean(token)) {
        let decodedToken = jwt_decode(token);
        let currentDate = new Date();

        // JWT exp is in seconds
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            isExpried=true
            localStorage.removeItem(StorageKeys.TOKEN);
            localStorage.removeItem(StorageKeys.USER);
        } else {
            isExpried =false
        }
    }
    return isExpried
}

