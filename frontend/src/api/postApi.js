import axios from "axios";
const url = "http://localhost:8000";

export const createPost = (post) => {
  return axios
    .post(url + "/posts", post)
    .then((x) => x.data)
    .catch((err) => err);
};
export const getPosts = () => 
  new Promise((resolve, reject) => {
  return axios
    .get(url + "/posts")
    .then((x) => resolve(x.data))
    .catch((err) => {
      alert(err);
    reject(err)
  });
});
export const getPostsByGarageId = (id) => {
  return axios
    .get(url + "/posts/garage/" + id)
    .then((x) => x.data)
    .catch((err) => err);
};
export const getAllPostsAndComments = () => {
  return axios
    .get(url + "/posts/all")
    .then((x) => x.data)
    .catch((err) => err);
};
export const getPostsByAuthor = (author) =>
  new Promise((resolve, reject) => {
    return axios
      .get(url + "/posts/author/" + author)
      .then((x) => resolve(x.data))
      .catch((error) => {
        alert(error);
        reject(error);
      });
  });
  
export const getNestedComments = (post) => {
  let comments = [];
  axios.get(url + "/posts/comments/" + post).then((c) => console.log(c));
};
export const getPostById = (id) => {
  return axios
    .get(url + "/posts/" + id)
    .then((x) => x.data)
    .catch((err) => err);
};
export const getCommentsFromPost = (id) => {
  return axios
    .get(url + "/comments/" + id)
    .then((x) => x.data)
    .catch((err) => err);
};
export const getPostsByGarageName = (name)=>{
  return axios.get(url + '/posts/garage/' +name)
  .then(x=>x.data)
  .catch(err=>err)
}