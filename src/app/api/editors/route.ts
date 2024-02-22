import { db } from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { createWorkspaceSchema } from "@/lib/validators/workspaces";

// create workspace
export async function GET(request: NextRequest) {

    const id = request.nextUrl.searchParams.get("id");
    try {
        const editors = await db.editor.findMany({
            where:{
                workspaceId: id as string,
            },
            include: {
                editor: true
            }
        });
        console.log(editors);
        return NextResponse.json(editors);
        
        
    } catch (error) {
        throw new Error("Something went wrong");

    }
  
}