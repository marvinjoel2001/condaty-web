import { NextResponse } from 'next/server';
import { LoginCredentials } from '@/types/auth';

export async function POST(request: Request) {
  try {
    const body: LoginCredentials = await request.json();
    
    const response = await fetch('http://localhost:3001/users');
    const users = await response.json();
    
    const user = users.find((u: any) => 
      u.email === body.email && u.password === body.password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    const {  ...userWithoutPassword } = user;
    
    const token = 'mock_jwt_token';

    return NextResponse.json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}