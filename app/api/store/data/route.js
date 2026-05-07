import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


// Get  store info & products

export async function GET(request) {
  try {
    
    const {searchParams} =  new URL(request.url);

    const username =searchParams.get('username').toLowerCase();

    
    if (!username) {
        return NextResponse.json({error:"Missing username"}, {status:400})
    }

    const store = await prisma.store.findUnique({
      where:{username , isActive:true},
      include:{Product:{include:{rating:true}}}
    })

    if(!store){
         return NextResponse.json({error:"Store not find"}, {status:400})
    }
    return NextResponse.json({store});

  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
