import db from '@/lib/db';

export async function addBalance(userId: any, amount: any) {
    const user = await db.users.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    const updatedUser = await db.users.update({
      where: { id: userId },
      data: { Balance: user.Balance + amount },
    });
  
    return updatedUser;
  }