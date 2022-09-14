import { useState } from "react";

export default function Blog({ blog }) {
  const [edit, setEdit] = useState(false);
  const [newtitle, setNewTitle] = useState("");

  return (
    <div className="card" key={blog.id}>
      <p className="title">
        {blog.title}
        <button onClick={() => setEdit(true)}>edit</button>{" "}
      </p>
      {edit ? (
        <>
          <input
            type="text"
            placeholder="New Blog Title..."
            value={newtitle}
            onChange={(e) => setNewTitle(e.target.value)}
          ></input>
          <button>Save</button>
        </>
      ) : null}
      <p className="content">{blog.content}</p>
      {blog.author ? (
        <p className="content">
          <b>@{blog.author.name}</b>
        </p>
      ) : (
        <p className="content">unknown user</p>
      )}
    </div>
  );
}
