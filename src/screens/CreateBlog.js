import React, { useEffect, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const CreateBlog = ( { authenticated } ) => {

    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const navigate = useNavigate();

    const collectionReference = collection(db,"blogs")
    const createBlog = async () => {
        if(!title || !content){
          return alert("Please enter all the fields!");
        }
        await addDoc(collectionReference,{title,content,author:{name:auth.currentUser.displayName, id:auth.currentUser.uid}})
        navigate("/")
    }
 
    useEffect(() => {

      const token = localStorage.getItem("authenticated")
       if(token != true){
        navigate("/login")
       }
    },[])
    
  return (
    
    <div>
        <div className='CreateBlog-div'>
            <h1>Create Blog</h1>
            <input type="text" placeholder='Blog Title...' value={title} onChange={(e) => {setTitle(e.target.value)}}></input>
            <textarea placeholder='Blog Content Starts here...' value={content} onChange={(e) => {setContent(e.target.value)}}></textarea>
            <button className='btn' onClick={createBlog}><b>CREATE BLOG</b></button>
        </div>
    </div>
  )
}

export default CreateBlog