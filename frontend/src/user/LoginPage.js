import React, { useState } from "react";
import { getUsers } from "../api/userApi.js";
import { createUser } from "../api/userApi.js";

function LoginPage(){
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [email, setEmail] = useState('');

    const printDatabase = async ()=>{
        getUsers().then(x=>console.log(x))
    }
    const createNewUser = async ()=>{
        let user = {
            'username':username,
            'password':password,
            'email':email,
            'admin':false
        }
        createUser(user)
    }
    return( <>
    <h1>login page</h1>
    <label htmlFor='username'>username</label>
    <input type="text" id='username'
    value={username}
    onChange={e=>setUsername(e.target.value)}/>
    <label htmlFor='password'>password</label>
    <input type="text" id='password'
    value={password}
    onChange={e=>setPassword(e.target.value)}/>
    <label htmlFor='email'>email</label>
    <input type="email" id='email'
    value={email}
    onChange={e=>setEmail(e.target.value)}/>
    <button onClick={()=>{createNewUser()}}>create user</button>
    <button onClick={()=>{printDatabase()}}>get Users</button>

    </>

    
    )
}
export default LoginPage;