'use client';

import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

   const response = await signIn('credentials', {
      Username: username,
      Password: password,
      redirect: false,
   })

   console.log({response});
   if (!response?.error) {
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
        <h2>Password: </h2>
        <input
          name="password"
          className="border border-black text-black"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
        <button type="button" onClick={() => signIn('google')}>Log in with Google</button>
      </form>
    </div>
  );
}