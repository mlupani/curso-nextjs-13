'use server';

import { getUserServerSession } from "@/app/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//const sleep = (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

export const toggleTodo = async (id: string, complete: boolean) => {
    //await sleep(3);
    const todo = await prisma.todo.findFirst({ where: { id } });
    if(!todo) throw new Error('Todo not found');
    revalidatePath('/dashboard/server-todos');
    return prisma.todo.update({ where: { id }, data: { complete } });
}

export const addTodo = async (description: string) => {
    try {
        const user = await getUserServerSession();
        if(!user) redirect('/');
        const todo = prisma.todo.create({ data: { description, userId: user.id } });
        revalidatePath('/dashboard/server-todos');
        return todo;
    } catch (error) {
        console.log(error);
        return {
            message: 'Error al crear Todo'
        }
    }
}

export const deleteCompleted = async ():Promise<void> => {
    const user = await getUserServerSession();
    if(!user) throw new Error('User not found');
    await prisma.todo.deleteMany({ where: { complete: true, userId: user.id } });
    revalidatePath('/dashboard/server-todos');
}