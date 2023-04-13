import axios from "axios";
const url = "http://localhost:8000"
export const getGarageByName = (name) =>{
    return axios.get(url + '/garages/' + name)
    .then(x=>x.data)
    .catch(err=>err)
}
export const getAllGarages = () =>{
    return axios.get(url + '/garages')
    .then(x=>x.data)
    .catch(err=>err)
}
export const getGaragesByMember = (username) =>{
    return axios.get(url + '/memberships/user/' + username)
    .then(x=>x.data)
    .catch(err=>err)
}