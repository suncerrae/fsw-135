import React from 'react';

const Issue = (props) => {
  const { title, description, imageUrl } = props
  return (
    <div className="issue">
      <h1>{title}</h1>
      <img src={imageUrl} alt={imageUrl} width={250}/>
      <h3>{description}</h3>
      <input
      type="text"
      placeholder="Comments"
      />
      <div className="upvote-buttons">
        <img src="https://img.icons8.com/color/20/000000/facebook-like.png" alt="thumbsup"/>
        <img src="https://img.icons8.com/color/20/000000/thumbs-down.png" alt="thumbsdown"/>
      </div>
    </div>
  )
}

export default Issue;