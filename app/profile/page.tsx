'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

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
  <Link href="/AddItems">
      <button>Add Items</button>
    </Link>
    </div>
  );
  
}