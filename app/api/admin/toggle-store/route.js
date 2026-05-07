import prisma from "@/lib/prisma";
import authAdmin from "@/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


//toggle store  isActive

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = await authAdmin(userId);

    if (!isAdmin) {
      return NextResponse.json(
        { error: "not Authorised Admin" },
        { status: 401 }
      );
    }

    const {storeId} = await request.json();

     if (!storeId) {
      return NextResponse.json(
        { error: "not Store Id" },
        { status: 400 }
      );
    }
     const store = await prisma.store.findUnique({
      where: { id:storeId }
    });

     if (!store) {
      return NextResponse.json(
        { error: "store not found" },
        { status: 400 }
      );
    }

    await prisma.store.update({
        where:{id:storeId},
        data:{isActive:!store.isActive}
    })
    

    return NextResponse.json({ message:"store updated succesfully"});
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
