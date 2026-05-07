// add new ratings

import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    const { userId  } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {orderId ,productId , rating , review  } = await request.json()

    const order = await prisma.order.findUnique({
        where:{id:orderId,userId }
    })
     if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
     }

  const isAlreadyRated = await prisma.rating.findFirst({
    where:{productId, orderId}
  })

  if (isAlreadyRated) {
     return NextResponse.json({ error: "Product  already rated" }, { status: 400 });
  }

  const response = await prisma.rating.create({
    data:{userId,productId,rating,review,orderId}
  })
     
return NextResponse.json({message:"Rating added Succesfully ",rating:response})

  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



export async function GET(request) {
  try {
    
     const { userId  } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ratings = await prisma.rating.findMany({
        where:{userId}
    })

    return NextResponse.json({ratings})

  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
