import prisma from "@/lib/prisma";
import authAdmin from "@/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


//toggle store  isActive

export async function GET(request) {
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


    const orders = await prisma.order.count()
    const stores = await prisma.store.count()

    const allOrders = await prisma.order.findMany({
        select:{
            createdAt:true,
            total:true,
        }
    })


    let totalRevenue =0

    allOrders.forEach(order =>{
        totalRevenue +=order.total
    })

    const revenue = totalRevenue.toFixed(2);

    // total products

    const products = await prisma.product.count()

    const dashboardData ={
        orders,
        stores,
        products,
        revenue,
        allOrders
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
