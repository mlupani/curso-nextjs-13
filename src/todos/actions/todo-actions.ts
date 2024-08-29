'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

//const sleep = (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

export const toggleTodo = async (id: string, complete: boolean) => {
    //await sleep(3);
    const todo = await prisma.todo.findFirst({ where: { id } });
    if(!todo) throw new Error('Todo not found');
    revalidatePath('/dashboard/server-todos');
    return prisma.todo.update({ where: { id }, data: { complete } });
}

export const addTodo = (description: string) => {
    try {
        const todo = prisma.todo.create({ data: { description } });
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
    await prisma.todo.deleteMany({ where: { complete: true } });
    revalidatePath('/dashboard/server-todos');
}