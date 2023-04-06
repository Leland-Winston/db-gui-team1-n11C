import axios from "axios";
import { useState } from "react";
const url = 'http://localhost:8000';
export const createPost = (post) =>{
    return axios.post(url + '/posts').then(x=>x.data).catch(err=>err)
}
export const getPosts = () =>{
    return axios.get(url + '/posts').then(x=>x.data).catch(err=>err)
}
export const getPostById = (id) =>{
    return axios.get(url + '/posts/' + id).then(x=>x.data).catch(err=>err)
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
    let commentTree = [];
    return axios.get(url + '/comments/' + post)
    .then(x=>{
        constructCommentTree(x.data, commentTree);
        console.log(commentTree)
        return commentTree;
    })
    .catch(err=>err)
}
const constructCommentTree = (allComments, commentTree)=>{
    allComments.forEach(newComment=>{
        if(newComment.parent !== null){ //comment is not a root
            commentTree.forEach(root=>{
                //recursively insert into each root
                recusriveInsert(newComment, root)
            })
        }
        else{ //add new root
            commentTree.push({...newComment, ...{children:[]}})
        }
    })
}
const recusriveInsert = (newComment, root)=>{
    if(newComment.parent == root.comment_id){
        root.children.push({...newComment, ...{children:[]}})
    }
    else{
        if(root.children.length > 0){
            root.children.forEach(c=>{
                recusriveInsert(newComment,c)
            })
        }
    }   
}