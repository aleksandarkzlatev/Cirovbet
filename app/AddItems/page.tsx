'use client';

import React, { useState } from 'react';
import db from '@/lib/db';

export default function AddItem() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);
  
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files ? e.target.files[0] : null);
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      if (image) {
        formData.append('image', image);
      }
  
      const response = await fetch('/api/items', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      console.log(data);
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
            Balance:
            <input type="text" className="border border-black text-black" value={price} onChange={(e) => setPrice(e.target.value)} required/>
          </h3>
          <h4>
            Image:
            <input type="file" className="border border-black text-black" onChange={handleImageChange} required/>
          </h4>
          <button type="submit">Add Item</button>
        </form>
      </div>
    );
  }
