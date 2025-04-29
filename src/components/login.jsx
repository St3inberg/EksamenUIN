
import React, { useState } from 'react';

function Login() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const res = await fetch('https://7sm8nni0.api.sanity.io/v2021-06-07/data/mutate/production', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer skDHdyfylo9Cj36Qq0mtjhEwq6YH4SImkkIE9wDUduaOvloPOZtIQsLIuwbQLxOHLEI1wlzLv6CqoT728CNinSgc29QV9NPtwVBQ7Si4zxGuVfkyMOJVKfdZMbzs2Iu2zochN7eRnxWWLUXKdUx5ZO1IoNogAm92dhagRP1XRVKBmqErrjWN'
        },
        body: JSON.stringify({
          mutations: [
            {
              create: {
                _type: 'user',
                nickname,
                email,
                password,
                country
              }
            }
          ]
        })
      });

      const data = await res.json();
      if (data.results) {
        setMessage('User created!');
        setNickname('');
        setEmail('');
        setPassword('');
        setCountry('');
      } else {
        setMessage('Failed to create user.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error sending data.');
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Login Form</h2>
      <input type="text" placeholder="Nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required /><br/>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/>
      <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required /><br/>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default Login;
