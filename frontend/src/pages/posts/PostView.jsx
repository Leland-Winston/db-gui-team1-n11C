import react, { useEffect, useState, useContext } from "react";
import { getCommentsFromPost, getPostById } from "../../api/postApi";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
const constructCommentTree = async (allComments, commentTree) => {
    allComments.forEach(newComment => {
        if (newComment.parent !== null) { //comment is not a root
            commentTree.forEach(root => {
                //recursively insert into each root
                recusriveInsert(newComment, root)
            })
        }
        else { //add new root
            commentTree.push({ ...newComment, ...{ children: [] } })
        }
    })
}
const recusriveInsert = (newComment, root) => {
    if (newComment.parent == root.comment_id) {
        root.children.push({ ...newComment, ...{ children: [] } })
    }
    else {
        if (root.children.length > 0) {
            root.children.forEach(c => {
                recusriveInsert(newComment, c)
            })
        }
    }
}
export default function PostView() {
    let id = useParams().post;
    let [commentTree, setCommentTree] = useState([]);
    let [currPost, setCurrPost] = useState({});
    let [comments, setComments] = useState([]);
    let [commentsLoaded, setCommentsLoaded] = useState(false);
    useEffect(() => {
        getPostById(id).then(x => {
            setCurrPost(x[0]);
        });
    }, [])
    useEffect(() => {
        async function loadComments() {
            const response = await getCommentsFromPost(id);
            setComments(response)
            constructCommentTree(comments, commentTree)
            console.log("comments loaded:" + commentTree.length)
            if (commentTree.length > 0) setCommentsLoaded(true)
        }
        if (!commentsLoaded) {
            console.log("loading comments")
            loadComments().then(() => console.log(commentTree));
        }
    }, [currPost])
    return (
        !!currPost &&
        <>
            <h1>{currPost.title}</h1>
            <h6>{currPost.content}</h6>
            <button onClick={() => console.log(commentTree)}>xdd</button>
            {commentTree.map(c => {
                return <Comment comment={c}></Comment>
            })}
        </>
    )
}