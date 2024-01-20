'use client';

import db from '@/lib/db';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AddItem() {
    const { data: session } = useSession();
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState(''); // Add this line to declare the 'error' state variable
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (isNaN(Number(price))) {
        setError('Price must be a number'); // Add this line to set the error message
        return;
      }
      event.preventDefault();
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          price: price,
          description: description,
          }),
      });
      const data = await response.json();     
      if (!data?.error) {
        router.push('/profile');
        router.refresh();
      }
    };
  
    return (
        <div className='flex flex-col gap-2 mx-auto max-w-md mt-10'>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mx-auto max-w-md mt-10">
          <h1>
            Name:
            <input type="text" className="border border-black text-black" value={name} onChange={(e) => setName(e.target.value)} required/>
          </h1>
          <h2>
            Description:
            <input type="text" className="border border-black text-black" value={description} onChange={(e) => setDescription(e.target.value)} required/>
          </h2>
          <h3>
        Price:
        <input type="text" className="border border-black text-black" value={price} onChange={(e) => setPrice(e.target.value)} required/>
        </h3>
          <button type="submit">Add Item</button>
        </form>
      </div>
    );
  }
