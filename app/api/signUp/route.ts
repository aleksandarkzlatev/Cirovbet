import { NextResponse } from 'next/server'
import React from 'react'
import { hash } from 'bcrypt';
import db from '@/lib/db';

/**
 * @swagger
 * /route:
 *   post:
 *     summary: Create a new user
 *     description: This endpoint creates a new user with the provided username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Username
 *               - Email
 *               - Password
 *             properties:
 *               Username:
 *                 type: string
 *                 description: The username of the user.
 *               Email:
 *                 type: string
 *                 description: The email of the user.
 *               Password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: The user was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 */
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
