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
    return axios.delete(url + '/memberships', 
    {data:{garage:garage,
    username:username}})
    .then(x=>x)
    .catch(err=>err)
}
export const createGarage = (body) => {
    return axios.post(url + '/garages', body)
    .then(x=>x.data)
    .catch(err=>err)
}
export const deleteGarage = (name) =>{
    return axios.delete(url + '/garages/' + name)
    .then(x=>x.data)
    .catch(err=>err)
}
export const removeMembersFromGarage = (name) =>{
    return axios.delete(url + '/memberships/garage/' + name)
    .then(x=>x.data)
    .catch(err=>err)
}
export const editGarage = (newGarage) =>{
    return axios.put(url + '/garages', newGarage)
    .then(x=>x.data)
    .catch(err=>err)
}