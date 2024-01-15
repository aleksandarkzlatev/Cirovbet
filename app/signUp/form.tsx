'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { set } from 'date-fns';

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
   /* const checkResponse = await fetch('/api/auth/checkUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Username: username,
        Email: email,
        Password: password
      }),
    });
  
    const userData = await checkResponse.json();
  
    if (userData.exists) {
      alert('Username or email already exists');
      return;
    }
  */
    if(event.type === "button"){
      const { data: session } = useSession()
      if(session){
        setUsername(session.user?.name || '');
        setEmail(session.user?.email || '');
        setPassword('');
      }
      
    }
    const response = await fetch('/api/auth/signUp', {
      method: 'POST',
      body: JSON.stringify({
        Username: username,
        Email: email,
        Password: password,
      }),
    });
  
    console.log({response});
    if (response.ok) {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className='flex flex-col gap-2 mx-auto max-w-md mt-10'>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
        <h1>Username: </h1>
        <input
          name="userName"
          className="border border-black text-black"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <h2>Email: </h2>
        <input
          name="email"
          className="border border-black text-black"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <h3>Password: </h3>
        <input
          name="password"
          className="border border-black text-black"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Sign up</button>
        <button type="button" onClick={() => signIn('google')}>Sign up with Google</button>
      </form>
    </div>
  );
}