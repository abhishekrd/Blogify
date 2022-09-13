import React, { useEffect, useState } from 'react'
import { collection,getDocs,query } from 'firebase/firestore'
import { db, auth } from '../firebaseConfig'

const Home = () => {
 
  const [blogs,setBlogs] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const getAllBlogs = async () => {

      const q = query(collection(db,"blogs"))
  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
       setBlogs(querySnapshot.docs.map((doc) => ({...doc.data(),id:doc.id})))
       setLoading(false)
    })

    }

    getAllBlogs()
  },[])
  return (<>
    {loading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> :  <div className='card-div'>
    
    {blogs.map((blog) => {
      console.log(blog.author);
      return <div className='card' key={blog.id}>
     <p className='title'>{blog.title}</p>
     <p className='content'>{blog.content}</p>
     {blog.author ? <p className='content'><b>@{blog.author.name}</b></p> : <p className='content'>unknown user</p>}
    </div>
 })}
   </div>   }
    
   </>)
}

export default Home