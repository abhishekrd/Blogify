import React, { useEffect, useState } from 'react'
import { collection,getDocs,query } from 'firebase/firestore'
import { db, auth } from '../firebaseConfig'

const Home = () => {
 
  const [blogs,setBlogs] = useState([]);
  
  useEffect(() => {
    const getAllBlogs = async () => {

      const q = query(collection(db,"blogs"))
  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
       setBlogs(querySnapshot.docs.map((doc) => ({...doc.data(),id:doc.id})))
  
    })

    }

    getAllBlogs()
  },[])
  return (
    <div className='card-div'>
    {blogs.map((blog) => {
      return <div className='card'>
     <p className='title'>{blog.title}</p>
     <p className='content'>{blog.content}</p>
     
    </div>
 })}
   </div>    
  )
}

export default Home