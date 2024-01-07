'use client';

import React, { useState } from 'react';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(name, email, password);
    // TO DO: send data to mysql database, which still needs to be set up
  };

  return (
    <div className='flex flex-col gap-2 mx-auto max-w-md mt-10'>
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mx-auto max-w-md mt-10"
    >
      <h1>Name: </h1>
      <input
        name="name"
        className="border border-black text-black"
        type="name"
        value={name}
        onChange={e => setName(e.target.value)}
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
      <button type="submit">Register</button>
    </form>
    </div>
  );
}