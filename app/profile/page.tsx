'use client';

import Link from 'next/link';
import { useSession} from 'next-auth/react';

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (!session) {
    return <div>You are not signed in</div>;
  }
  return (
    <div>
      <h1>Your Profile</h1>
      { (session as any).user?.provider === 'google' ? (
        <div>
          <p>Name: {(session as any).user.name}</p>
          <p>Email: {(session as any).user.email}</p>
          <p>Balance: {(session as any).user.Balance}</p>
        </div>
      ) : (
        <div>
          <p>Username: {(session as any).user.Username}</p>
          <p>Email: {(session as any).user.Email}</p>
          <p>Balance: {(session as any).user.Balance}</p>
        </div>
      )}
     <h2>All Items</h2>
      {(session as any).user?.items ? (session as any).user.items.map((item: any, index: number) => (
        <div key={item.id}>
          <h3>Item {index + 1}</h3>
          <h4>Name: {item.name}</h4>
          <p>Description: {item.description}</p>
          <p>Price on market: {item.price}</p>
        </div>
      )) : <p>No items found</p>}
      <Link href="/AddItems">
        <button>Add Items</button>
      </Link>
    </div>
  );
}