import axios from "axios";
const url = 'http://localhost:8000';
export const createPost = (post) =>{
    return axios.post(url + '/posts').then(x=>x.data).catch(err=>err)
}
export const getPosts = () =>{
    return axios.get(url + '/posts').then(x=>x.data).catch(err=>err)
}
export const getPostsByGarageId = (id)=>{
    return axios.get(url + '/posts/garage/' + id).then(x=>x.data).catch(err=>err)
}
export const getAllPostsAndComments = () =>{
    return axios.get(url + '/posts/all').then(x=>x.data).catch(err=>err)
}
export const getPostsByAuthorId = (author) =>{
    return axios.get(url + '/posts/author/' + author)
    .then(x=>x.data)
    .catch(err=>err)
}
export const getCommentsFromPost = (post)=>{
    return axios.get(url + '/comments/' + post)
    .then(x=>x.data)
    .catch(err=>err)
}