import React, { useState } from 'react';

const initialInputs = {
    title: "",
    description: "",
    imageUrl: ""
}

const IssueForm = (props) => {
    const [inputs, setInputs] = useState(initialInputs)
    const {addIssue} = props

    function handleChange(e){
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addIssue(inputs)
        setInputs(initialInputs)
    }

    const {title, description, imageUrl} = inputs
    return(
        <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        value={title} 
        onChange={handleChange} 
        placeholder="Title"/>
      <input 
        type="text" 
        name="description" 
        value={description} 
        onChange={handleChange} 
        placeholder="Description"/>
      <input 
        type="text" 
        name="imageUrl" 
        value={imageUrl} 
        onChange={handleChange} 
        placeholder="Image Url"/>
      <button>Add Issue</button>
    </form>
    )
}

export default IssueForm;