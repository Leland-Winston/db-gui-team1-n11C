import axios from "axios";
const url = "http://localhost:8000";
export const getUserByUsername = (username) =>{
    console.log("getting" + username)
    return axios.get(url + '/users/username/' + username)
    .then(x=>x.data)
    .catch(err=>err)
}