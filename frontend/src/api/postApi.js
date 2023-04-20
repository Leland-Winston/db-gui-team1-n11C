import axios from "axios";
const url = "http://localhost:8000";

export const createPost = (post) => {
  return axios
    .post(url + "/posts", post)
    .then((x) => x.data)
    .catch((err) => err);
};
export const deletePost = (id) => {
  return axios.delete(url + "/posts/" + id);
};
export const getPosts = () =>
  new Promise((resolve, reject) => {
    return axios
      .get(url + "/posts")
      .then((x) => resolve(x.data))
      .catch((err) => {
        alert(err);
        reject(err);
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
export const getPostsByGarageName = (name) => {
  return axios
    .get(url + "/posts/garage/" + name)
    .then((x) => x.data)
    .catch((err) => err);
};
export const addNewRating = (id, username, score) => {
  return axios
    .post(url + "/likes/", { id: id, username: username, score: score })
    .then((x) => x.data)
    .catch((err) => err);
};
export const updatePostRating = (id, action) => {
  return axios
    .put(url + "/rating/post/" + id, { action: action })
    .then((x) => x.data)
    .catch((err) => err);
};
export const setUserScore = (id, username, action) => {
  return axios
    .put(url + "/likes/" + id + "/" + username, { action: action })
    .then((x) => x.data)
    .catch((err) => err);
};
export const getUserScore = (id, username) => {
  return axios
    .get(url + "/likes/" + id + "/" + username)
    .then((x) => x.data)
    .catch((err) => err);
};
export const deletePostsFromGarage = (name) =>{
  return axios.delete(url + '/posts/garage/' + name)
  .then(x=>x.data)
  .catch(err=>err)
}
export const deleteCommentsFromPost = (id) =>{
  return axios.delete(url + '/comments/post/' + id)
  .then(x=>x.data)
  .catch(err=>err)
}