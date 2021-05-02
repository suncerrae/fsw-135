import React, { useState } from 'react';

const Issue = (props) => {
  const { addComment,title, description, imageUrl } = props
  const[comment,setcomment] =useState ("")
  return (
    <div className="issue">
      <h1>{title}</h1>
      <img src={imageUrl} alt={imageUrl} width={250}/>
      <h3>{description}</h3>
      <input
      type="text"
      onChange={(e)=>(setcomment(e.target.value))}
       placeholder="Comments"
      />
       <div className="comment-button"onClick={()=>addComment({commentcontents:comment})}>submit commment</div>
      <div className="upvote-buttons">
        <img src="https://img.icons8.com/color/20/000000/facebook-like.png" alt="thumbsup"/>
        <img src="https://img.icons8.com/color/20/000000/thumbs-down.png" alt="thumbsdown"/>
      </div>
    </div>
  )
}

export default Issue;
