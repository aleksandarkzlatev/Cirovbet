import db from '@/lib/db';
import { connect } from 'http2';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '../auth/[...nextauth]/route';

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