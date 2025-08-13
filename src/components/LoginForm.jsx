import { useState } from 'react';
import { useNavigate } from "react-router";
import { useAuth } from '../AuthContext';

// import styles from './form.module.css';
import { Link } from 'react-router';

const LoginForm = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiUrl = `${import.meta.env.VITE_API_URL}/login`;
    const body = {
      email: emailAddress,
      hashed_password: password,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const statusCode = response.status;
      const data = await response.json();

      console.log('RESPONSE:', response, response.status);

      const { access_token } = data;
      localStorage.clear();
      localStorage.setItem('access_token', access_token);
      setIsAuth(statusCode === 200);
      navigate("/links");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Link to='/register'>Click here if you need register for an account</Link>
      <form
        // className={styles.form}
        method='POST'
        onSubmit={(e) => handleSubmit(e)}
      >
        <label>
          Username
          <input
            type='text'
            name='emailAddress'
            value={emailAddress}
            placeholder='user@email.com'
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type='password'
            name='password'
            value={password}
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type='submit'>Login</button>
      </form>
    </>
  );
};

export default LoginForm;