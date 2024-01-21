'use client';

import React, { useEffect, useState } from 'react';

export default function Market() {
  const [items, setItems] = useState([]);
/*
  useEffect(() => {
    fetch('/api/allItems')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setItems(data))
      .catch(error => console.error('There has been a problem with your fetch operation:', error));
  }, []);
*/
  return (
    <div>
      <h2>Market</h2>
      {items.map((item: any) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Price: {item.price}</p>
          <p>Owner: {item.owner.name}</p>
        </div>
      ))}
    </div>
  );
}