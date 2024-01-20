import db from '@/lib/db';
import { connect } from 'http2';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '../auth/[...nextauth]/route';

/**
 * @swagger
 * /route:
 *   post:
 *     summary: Create a new item
 *     description: This endpoint creates a new item with the provided name, description, and price.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the item.
 *               description:
 *                 type: string
 *                 description: The description of the item.
 *               price:
 *                 type: number
 *                 description: The price of the item.
 *     responses:
 *       200:
 *         description: The item was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 */
export async function POST(request: NextRequest) {
    try {
        const { name, description, price } = await request.json();
        const session = await getAuthSession();
        console.log(session.user);
        const id = await db.users.findUnique({ where: { Email: session.user.Email },
            select: { id: true } });
        if (!id) {
            return NextResponse.next();
        }
        const response = await db.items.create({
            data: {
                name: name,
                description: description,
                price: price,
                image: '',
                userId: id.id,
                user: undefined as undefined,
            },
        });
        console.log(response);
    }
    catch (error) {
        console.log(error)
    }
    
    return NextResponse.json({ message: 'success' })
}