import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma"
import * as bcrypt from 'bcryptjs';

export const getUserServerSession = async () => {
    const session = await getServerSession(authOptions);
    return session?.user ?? null;
}

export const signInWithUserAndPassword = async (email: string, password: string) => {
    const dbUser = await prisma.user.findUnique({where: { email: email }})

    if(!dbUser){
        return await createUser(email, password);
    }

    if(!bcrypt.compareSync(password, dbUser.password ?? '')){
        //throw new Error('Invalid password');
        return null;
    }

    return dbUser;

}

const createUser = async (email: string, password: string) => {
    const dbUser = await prisma.user.create({
        data: {
            email: email,
            password: bcrypt.hashSync(password)
        }
    });

    return dbUser;
}