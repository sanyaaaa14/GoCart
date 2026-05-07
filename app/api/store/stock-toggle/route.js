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

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: "Misiing product details" }, { status: 401 });
    }


    const  storeId = await authSeller(userId);

       if (!storeId) {
        return NextResponse.json({error:"not Authorised"}, {status:401})
    }

    const  product = await prisma.product.findFirst({
        where:{id: productId,storeId}
    })
    if (!product) {
        return NextResponse.json({error:"no Product found"}, {status:404})
    }

    await prisma.product.update({
        where:{id:productId},
        data:{inStock: !product.inStock}
    })

    return NextResponse.json({message: "product stock update successfully"})
  } catch (error) {
    console.error("Post error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
