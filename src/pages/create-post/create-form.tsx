import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { db,auth } from "../../config/firebase"
import {addDoc,collection} from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"


interface CreateFormData{
    title : string,
    description : string,
}

export const CreateForm =() => {
    const schema = yup.object().shape({
        title: yup.string().required("*Title Required"),
        description:yup.string().required("*Description Required")
    })

    const {register,handleSubmit,formState : {errors}} = useForm({
        resolver:yupResolver(schema)
    })

    const neviagte = useNavigate();

    const [user] = useAuthState(auth)

    const postRef = collection(db,"posts")

    const Createpost = async(data: CreateFormData) => {
        alert("Response has been submitted!")
        await addDoc(postRef,{
            ...data,
            username:user?.displayName,
            userId: user?.uid
        })
        neviagte("/")
    }

    return <form onClick={handleSubmit(Createpost)} className="form-container">
        <input placeholder="Title..." {...register("title")} className="form-input"/>
        <p style={{color:"red"}}>{errors.title?.message}</p>
        <textarea placeholder="Description..."{...register("description")} className="form-input"/>
        <p style={{color:"red"}}>{errors.description?.message}</p>
        <input type="Submit" className="submit-button"/>

    </form>
}