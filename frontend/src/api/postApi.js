import axios from "axios";
const url = 'http://localhost:8000';

export const createPost = (post) =>{
    return axios.post(url + '/posts', post).then(x=>x.data).catch(err=>err)
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
export const getPostsByAuthorId = (author) => new Promise((resolve, reject) =>{
    return axios.get(url + '/posts/author/' + author)
    .then(x=> resolve(x.data))
    .catch(error => {
        alert(error);
        reject(error);
    })
})
export const getCommentsFromPostId = (id) =>{
    return axios.get(url + '/posts/comments/' + id)
    .then(x=>x.data)
    .catch(err=>err)
}
export const getNestedComments = (post) =>{
    let comments = [];
    axios.get(url + '/posts/comments/' + post)
    .then(c=>console.log(c))
}