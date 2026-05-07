import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// Auth seller


export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

  const  storeId = await authSeller(userId);

    if (!storeId) {
        return NextResponse.json({error:"not Authorised"}, {status:401})
    }

    const orders = await prisma.order.findMany({
        where:{storeId}
    })

    const  products = await prisma.product.findMany({
        where:{storeId}
    })

    const ratings = await prisma.rating.findMany({
        where:{productId:{in:products.map(product => product.id)}},
        include:{user:true , product:true}
    })

    const dashboardData = {
        ratings,
        totalOrders:orders.length,
        totalEarnings : Math.round(orders.reduce((acc,order)=>acc+order.total,0)),
        totalProducts : products.length
    }

    return NextResponse.json({dashboardData});

  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
