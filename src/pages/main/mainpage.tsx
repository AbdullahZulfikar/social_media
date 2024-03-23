import {getDocs,collection} from "firebase/firestore"
import { db } from "../../config/firebase"
import { useEffect, useState } from "react"
import { Posts } from "./post"


export interface Post {
    id : string,
    userId : string,
    title : string,
    username : string,
    description : string
}

export const Main = () => {

    const postRef = collection(db,"posts")
    const [postsList,setPostList] = useState<Post[] | null>(null)

    const getPost = async() => {
        const data = await getDocs(postRef)
        setPostList(data.docs.map((doc) => ({...doc.data() , id: doc.id})) as Post[])
    }

    useEffect(()=> {
        getPost()
    });
    
    return (
        <div>
            <h1>{postsList?.map((posts) => <Posts posts={posts}/>)}</h1>
            
        </div>
        
    )
}