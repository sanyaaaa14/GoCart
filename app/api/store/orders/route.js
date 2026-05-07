import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    const  storeId = await authSeller(userId);

       if (!storeId) {
        return NextResponse.json({error:"not Authorised"}, {status:401})
    }

    const {orderId , status} = await request.json();

    await prisma.order.update({
        where :{id:orderId},
        data: {status}
    })


    return NextResponse.json({ message :"Order status Updated"});

  } catch (error) {
    console.error("Post error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    const  storeId = await authSeller(userId);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

       if (!storeId) {
        return NextResponse.json({error:"not Authorised"}, {status:401})
    }
    
    const orders =await  prisma.order.findMany({

      where:{storeId},
      include:{user:true, address:true , orderItems:{
        include:{product:true}
      }},
      orderBy:{createdAt:'desc'}
    })
return NextResponse.json({orders});
    
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
