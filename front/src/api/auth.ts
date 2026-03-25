import { API_BASE_URL } from '@/utils/config';

export type SignUpData = {
  Email: string;
  FirstName: string;
  LastName: string;
  Password: string;
};

export type SignInData = {
  Email: string;
  Password: string;
};

export async function createUser(data: SignUpData): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include', // ✅ this is required for cookies to work
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create account');
  }
  
}

export async function login(data: SignInData): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include', // ✅ this is required for cookies to work
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Invalid credentials');
  }
  
}

export async function logOut(){
  await fetch(`${API_BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include', // crucial for sending cookies
  });

  window.location.href = '/';

}
