import { getUserServerSession } from "@/app/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
 title: 'Listado de Todos',
 description: 'SEO Title',
};

export default async function RestTodosPage() {

  const user = await getUserServerSession();
  if(!user){
    redirect('/');
  }
  const todos = await prisma.todo.findMany({ where: { userId: user.id }, orderBy: { description: 'asc' } });
  
  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      
      <TodosGrid todos={ todos } />
    </div>
  );
}