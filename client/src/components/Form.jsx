import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Form = () => {
  const [state, setState] = useState({username: '', email: '', submitted: false});

  let handleChange = (event) => {

    setState({...state, [event.target.name]: event.target.value})
    console.log(state);
  }

  let handleSubmit = (event) => {

    event.preventDefault();
    axios.post('/user', state)
      .then((response) => {
        console.log('user posted!')
      })
      .catch((error) => {
        console.log('ERROR: ', error)
      })

      setState({...state, submitted: true})

  }

  return (
    <form onSubmit={handleSubmit}  className="form">
      <div className={state.submitted ? "welcome" : "welcome hidden"}> WELCOME {state.username} </div>
      <label>
        Username:
        <input type="text" value={state.username} name="username" onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="text" value={state.email} name="email" onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Form;