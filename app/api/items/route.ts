import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

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
        const { name, description, price, image, user } = await request.json();
        const item = await db.items.create({
            data: {
              name: name,
              description: description,
              price: price,
              image: image,
              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          });
        await db.users.update({
            where: { id: user.id },
            data: {
              items: {
                connect: {
                  id: item.id,
                },
              },
            },
          });
    }
    catch (error) {
        console.log(error)
    }
    return NextResponse.json({ message: 'success' })
}