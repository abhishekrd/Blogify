import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Blog from "../components/Blog";
import { db } from "../firebaseConfig";

const Home = ({ authenticated }) => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }

    const getAllBlogs = async () => {
      const q = query(collection(db, "blogs"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setBlogs(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setLoading(false);
      });
    };

    getAllBlogs();
  }, []);

  return (
    <>
      {loading ? (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className="card-div">
          {blogs.map((blog) => {
            console.log(blog.author);
            return <Blog blog={blog} />;
          })}
        </div>
      )}
    </>
  );
};

export default Home;
