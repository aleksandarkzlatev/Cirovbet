'use client';

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function Profile() {
  const { data: session } = useSession()
  const [items, setItems] = useState([])

  useEffect(() => {
    if (session) {
     // fetchUserItems(session.user?.email).then(setItems)
    }
  }, [session])

  if (!session) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <p>Name: {session.user?.name}</p>
      <p>Email: {session.user?.email}</p>
      <h2>Items:</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

/*async function fetchUserItems(Еmail) {
  
  return fetch(`/api/items?email=${encodeURIComponent(Еmail)}`)
    .then(response => response.json())
}*/