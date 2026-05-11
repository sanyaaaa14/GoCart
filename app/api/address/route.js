import prisma from "@/lib/prisma";
import { getAuth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!dbUser) {
      await prisma.user.create({
        data: {
          id: userId,
          email: user.emailAddresses?.[0]?.emailAddress || "",
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User",
          image: user.imageUrl || "",
        },
      });
    }

    const {address} = await request.json()
    address.userId = userId

    const newAddress = await prisma.address.create({
        
        data:address

    })

    return NextResponse.json({newAddress , message:"Address added Successfully"})

  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    const addresses = await prisma.address.findMany({
        
        where:{userId}

    })

    return NextResponse.json({addresses})

  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}