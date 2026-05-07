import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import imagekit from "@/configs/imageKit";


export async function POST(request) {
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

    
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const mrp = Number(formData.get("mrp"));
    const price =  Number(formData.get("price"));
    const category = formData.get("category");
    const images = formData.getAll("images");

    // ✅ Check all required fields
    if (!name || !mrp || !description || !price || !category || !images) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const imagesUrl = await Promise.all(images.map( async (image)=>{

      
 const buffer = Buffer.from( await image.arrayBuffer());

    const response = await imagekit.upload({
      file: buffer,
      fileName: image.name,
      folder: "products",
    });

    // optimize image 

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1024" },
      ],
    });
          return optimizedImageUrl;
    }))

    await prisma.product.create({
        data: {
            name,
            description,
           mrp , price , category,
           images: imagesUrl,
           storeId
        }
    })

    return NextResponse.json({message :" Product Added Successfully"});

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
    
    const products =await  prisma.product.findMany({

      where:{storeId}
    })
return NextResponse.json({products});
    
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

