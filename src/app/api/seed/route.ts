import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'
import * as bcrypt from 'bcryptjs';

export async function GET(request: Request) { 

  await prisma.user.deleteMany(); // delete * from user
  await prisma.todo.deleteMany(); // delete * from todo

  await prisma.user.create({
    data: {
      email: 'test1@google.com',
      password: bcrypt.hashSync('123456'),
      isActive: true,
      roles: ['admin', 'user'],
      Todos: {
        create: [
          { description: 'Piedra del alma', complete: true },
          { description: 'Piedra del poder' },
          { description: 'Piedra del tiempo' },
          { description: 'Piedra del espacio' },
          { description: 'Piedra del realidad' },
        ]
      }
    },
  });

  return NextResponse.json({ message: 'Seed Executed' });
}