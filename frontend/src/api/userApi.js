import axios from "axios";
const url = "http://localhost:8000";
export const getUserByUsername = (username) =>{
    console.log("getting" + username)
    return axios.get(url + '/users/username/' + username)
    .then(x=>x.data)
    .catch(err=>err)
}
export const createUser = (user) =>{
    console.log("creating" + user)
    return axios.post(url + '/users', user)
    .then(x=>x.data)
    .catch(err=>err)
}
export const updateUsername = (user) => {
    return axios.put(url + '/users/username/' + user.username, {newName: user.newName})
    .then(x=>x.data)
    .catch(x=>x.data)
}
export const updatePassword = (user) => {
    return axios.put(url + '/users/password/' + user.name, {password: user.newPass})
}