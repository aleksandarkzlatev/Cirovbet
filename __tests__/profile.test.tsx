/*import { render, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';
import '@testing-library/jest-dom';
import Profile from '@/app/profile/page';

describe('Profile component', () => {
        it('renders loading state initially', () => {
                render(
                <SessionProvider session={{ expires: '2022-01-01T00:00:00Z' }}>
                <Profile />
            </SessionProvider>
        );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders not signed in state', () => {
    render(
    <SessionProvider session={{ expires: '2022-01-01T00:00:00Z' }}>
        <Profile />
      </SessionProvider>
    );
    expect(screen.getByText('You are not signed in')).toBeInTheDocument();
  });

  it('renders user profile and items', () => {
    const session = {
      user: {
        name: 'Test User',
        email: 'test@example.com',
        Balance: 100,
        items: [
          { id: 1, name: 'Item 1', description: 'Description 1', price: 10 },
          { id: 2, name: 'Item 2', description: 'Description 2', price: 20 },
        ],
      },
    };

    render(
    <SessionProvider session={{ expires: '2022-01-01T00:00:00Z', ...session }}>
        <Profile />
      </SessionProvider>
    );

    expect(screen.getByText('Your Profile')).toBeInTheDocument();
    expect(screen.getByText('Name: Test User')).toBeInTheDocument();
    expect(screen.getByText('Email: test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Balance: 100')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Price: 10')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    expect(screen.getByText('Price: 20')).toBeInTheDocument();
  });
});*/