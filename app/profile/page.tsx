// import React, { useEffect, useState } from 'react'
import { getAuthSession } from '../api/auth/[...nextauth]/route';

export default async function Profile() {
  // const [items, setItems] = useState([])
  const session = await getAuthSession();
  console.log(session);
  return (
    <div>
      {session ? (
        <>
        <p>Name: {session.user?.name}</p>
        <p>Email: {session.user?.email}</p>
        </>
      ) : (
        <p>Not signed in</p>
      )}
      {/* <h2>Items:</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul> */}
    </div>
  )
}

/*async function fetchUserItems(Еmail) {
  
  return fetch(`/api/items?email=${encodeURIComponent(Еmail)}`)
    .then(response => response.json())
}*/