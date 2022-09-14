import React, { useEffect, useState } from 'react'
import { collection,getDocs,query } from 'firebase/firestore'
import { db, auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'

const Home = ({ authenticated }) => {
  const navigate = useNavigate()
  const [blogs,setBlogs] = useState([]);
  const [loading,setLoading] = useState(true);
  const [edit,setEdit] = useState(false);
  const [newtitle,setNewTitle] = useState("")

  useEffect(() => {

    if(!authenticated){
      navigate("/login")
     }

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
     <p className='title'>{blog.title}<button onClick={() => setEdit(true)}>edit</button> </p>
     { edit ? <><input type="text" placeholder='New Blog Title...' value={newtitle} onChange={(e) => setNewTitle(e.target.value)}></input><button>Save</button></> : null}
     <p className='content'>{blog.content}</p>
     {blog.author ? <p className='content'><b>@{blog.author.name}</b></p> : <p className='content'>unknown user</p>}
    </div>
 })}
   </div> }
    
   </>)
}

export default Home