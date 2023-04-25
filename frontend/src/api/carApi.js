import axios from "axios";
const url = "http://localhost:8000"
export const getModelsFromGarage = (garage)=>{
    return axios.get(url + '/cars/' + garage)
    .then(x=>x.data)
    .catch(err=>err)
}
export const getCarFromGarage = (garage, model, year)=>{
    return axios.get(url + '/cars/' + garage + '/find', {model:model, year:year})
    .then(x=>x.data)
    .catch(err=>err)
}
export const getIdsFromModel = (garage, model) =>{
    return axios.get(url + '/cars/instances/' + garage, {model:model})
    .then(x=>x.data)
    .catch(err=>err)
}
export const createCar = (garage, model, year) =>{
    return axios.post(url + '/cars/' + garage, {model:model, year:year})
    .then(x=>x.data)
    .catch(err=>err)
}
export const createNewCarModel = (garage, model) =>{
    return axios.post(url + '/cars/newgarage/' + garage, {carsList:model})
    .then(x=>x.data)
    .catch(err=>err)
}