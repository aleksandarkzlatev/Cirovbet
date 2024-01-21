import db from '@/lib/db';

export default async function handler(req: any, res: any) {
        if (req.method === 'GET') {
            const allItems = await db.users.findMany({
                include: {
                    items: true,
                },
            });
    
            const items = allItems.flatMap(user => user.items);
    
            res.status(200).json(items);
    }
}
