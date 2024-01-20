import { NextResponse } from 'next/server'
import React from 'react'
import { hash } from 'bcrypt';
import db from '@/lib/db';


export async function POST(request: Request) {
  try {
    const { Username, Email, Password } = await request.json()
    const hashedPassword = await hash(Password, 10);

    const response = await db.users.create({
      data: {
        Username: Username,
        Email: Email,
        Password: hashedPassword,
      },
    })
  }
  catch (error) {
    console.log(error)
  }

    return NextResponse.json({ message: 'success' })
}
