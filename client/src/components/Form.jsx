import React, {useState, useEffect} from 'react';

const Form = () => {
  const [state, setState] = useState({username: '', email: ''});

  let handleChange = (event) => {

    setState({...state, [event.target.name]: event.target.value})
    console.log(state);
  }

  let handleSubmit = (event) => {

  }

  return (
    <form onSubmit={handleSubmit}  className="form">
    <label>
      Username:
      <input type="text" value={state.username} name="username" onChange={handleChange} />
    </label>
    <label>
      Email:
      <input type="text" value={state.username} name="email" onChange={handleChange} />
    </label>
    <input type="submit" value="Submit" />
  </form>
  )
}

export default Form;