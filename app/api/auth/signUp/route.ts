import { NextResponse } from 'next/server'
import React from 'react'
import { hash } from 'bcrypt';
import { sql } from '@vercel/postgres';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { Username, Email, Password } = await request.json()
    const hashedPassword = await hash(Password, 10);

    const response = await prisma.users.create({
      data: {
        Username: Username,
        Email: Email,
        Password: hashedPassword,
      },
    })
    console.log(response)
  }
  catch (error) {
    console.log(error)
  }

    return NextResponse.json({ message: 'success' })
}
