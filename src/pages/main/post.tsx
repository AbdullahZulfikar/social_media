import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { Post } from "./mainpage"

import {addDoc,collection,query,where,getDocs,deleteDoc, doc} from "firebase/firestore"
import { useEffect, useState } from "react";
interface Props {
    posts:Post
}

interface Like {
    userId : string
}

    export const Posts =(props : Props) => {
    const {posts} = props;

    const [user] = useAuthState(auth)
    const [likes , setLikes] = useState<Like[] | null>(null);
    const likesRef = collection(db,"likes")
    const likesDocs = query(likesRef,where("postId","==",posts.id))

    const getLikes = async() => {
        const data = await getDocs(likesDocs)
        setLikes(data.docs.map((doc) => ({userId:doc.data().userId})))
    
    }

    const hasUserLikes = likes?.find((like) => like.userId === user?.uid)

    const addLike = async() => {
    try {
        await addDoc(likesRef,{
            userId: user?.uid,
            postId:posts.id ,
        })
        if (user) {
            setLikes((prev) => prev? [...prev,{userId:user.uid}] : [{userId: user.uid}])
        }
    } catch (err) {
        console.log(err)
    }
    }


    const deleteLike = async() => {
        try {
            const likeToDeletequery = query(likesRef,
                where("postId","==",posts.id),
                where("userId","==",user?.uid))
            
            const likeToDeleteData = await getDocs(likeToDeletequery)
            const likeToDelete = doc(db,"likes",likeToDeleteData.docs[0].id)

            await deleteDoc(likeToDelete)
            
            } catch (err) {
                console.log(err)
            }
        }

    useEffect(() => {
        getLikes()
    })

    return (
        <div className="Post">
            <div className="title"> <h3>{posts.title}</h3></div>
            <div className="description"> <p> {posts.description}</p></div>
            <div className="author"> <p>@{posts.username}</p>
            <button onClick={hasUserLikes?deleteLike: addLike}>
                {hasUserLikes ? <>&#x1F44D;</> : <>&#x1F44E;</>}
                </button>
            {likes &&<p>Likes: {likes?.length}</p>}
            </div>
        </div>
    )
}