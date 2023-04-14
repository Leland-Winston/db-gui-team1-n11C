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
export const addUserToGarage = (garage, username) =>{
    return axios.post(url + '/memberships', 
    {garage:garage,
    username:username})
    .then(x=>x.data)
    .catch(err=>err)
}
export const removeUserFromGarage = (garage, username) =>{
    console.log(garage + " " + username)
    return axios.put(url + '/memberships', 
    {garage:garage,
    username:username})
    .then(x=>x)
    .catch(err=>err)
}