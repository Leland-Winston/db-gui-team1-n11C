import axios from 'axios';
const url = 'http://localhost:8000'
export const createUser = (body) => {
    let newUsername = body.username;
    let newPassword = body.password;
    let newEmail = body.email;
    console.log("creating user: " + newUsername);
    axios.post(url + '/user', body).then(()=>{
        console.log("Successfully created user")
    }).catch((err)=>{
        console.log("error creating user");
        alert("error: could not create user");
    })
}
export const getUsers = () => {
    console.log("getting users");
    return axios.get(url + '/users').then((x)=>x.data)
    .catch((err)=>{
        console.log('error retrieving users');
        alert('error: could not get users');
        
    })
}