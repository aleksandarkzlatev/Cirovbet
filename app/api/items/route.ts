import db from '@/lib/db';

export async function POST(request: Request) {
    try {
        const { Name, Description, Price, Image } = await request.json()
    
        const response = await db.items.create({
        data: {
            name: Name,
            description: Description,
            price: Price,
            image: Image,
            user: {}
        },
        })
        console.log(response)
    }
    catch (error) {
        console.log(error)
    }
    
    return Response.json({ message: 'success' })
}