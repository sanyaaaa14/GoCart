import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(request) {
  try {
    
    let products = await prisma.product.findMany({
        where: {inStock:true},
        include:{
            rating:{
                select:{
                    createdAt:true , rating:true, review:true , 
                    user:{ select:{name:true , image:true}}
                }
            },
            store:true
        },
        orderBy:{createdAt:'desc'}
    })
    // remove product when  isactive false

    products = products.filter(product => product.store.isActive)
    return NextResponse.json({products})

  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
