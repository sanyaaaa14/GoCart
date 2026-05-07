// import prisma from "@/lib/prisma";
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import imagekit from "@/configs/imageKit";


// export async function POST(request) {
//   try {
//     const { userId } = getAuth(request);

//     if (!userId) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const formData = await request.formData();
//     const name = formData.get("name");
//     const username = formData.get("username");
//     const description = formData.get("description");
//     const email = formData.get("email");
//     const contact = formData.get("contact");
//     const address = formData.get("address");
//     const image = formData.get("image");

//     // ✅ Check all required fields
//     if (!name || !username || !description || !email || !contact || !address || !image) {
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     const  store = await prisma.store.findFirst(
//         {
//             where:{userId:userId}
//         }
//     )
//     if (store) {
//         return NextResponse.json({status: store.status})
//     }
    
//    const isUsernameTaken = await prisma.store.findFirst({
//     where: { username: username.toLowerCase() }
// });


//     if (isUsernameTaken) {
//          return NextResponse.json(
//         { error: "Username is Already taken." },
//         { status: 400 }
//       );
//     }

//  const buffer = Buffer.from( await image.arrayBuffer());

//     const response = await imagekit.upload({
//       file: buffer,
//       fileName: image.name,
//       folder: "logos",
//     });

//     // optimize image 

//     const optimizedImageUrl = imagekit.url({
//       path: response.filePath,
//       transformation: [
//         { quality: "auto" },
//         { format: "webp" },
//         { width: "512" },
//       ],
//     });

//     const newStore = await prisma.store.create({
//         data: {
//             userId,
//             name,
//             description,
//             username: username.toLowerCase(),
//             email,contact,address,
//             logo:optimizedImageUrl
//         }
//     })

//     await prisma.user.update({
//         where:{id : userId},
//         data :{store :{connect:{ id: newStore.id}}}
//     })
//     return NextResponse.json(
//       {
//         success: true,
//         message: "Applied , Waiting for Approval "
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("POST error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }


// export async function GET(request) {
//   try {
//     const { userId } = getAuth(request);

//     if (!userId) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const  store = await prisma.store.findFirst(
//         {
//             where:{userId:userId}
//         }
//     )
//     if (store) {
//         return NextResponse.json({status: store.status})
//     }
    
//     return NextResponse.json(
//       {
//         status :"not registered"
//       }
//     );
//   } catch (error) {
//     console.error("GET error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import prisma from "@/lib/prisma";
import { getAuth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import imagekit from "@/configs/imageKit";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const user = await currentUser();

    if (!userId || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Sync missing user to Prisma to prevent foreign key constraint errors
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

    const formData = await request.formData();
    const name = formData.get("name");
    const username = formData.get("username");
    const description = formData.get("description");
    const email = formData.get("email");
    const contact = formData.get("contact");
    const address = formData.get("address");
    const image = formData.get("image");

    // Check required fields
    if (!name || !username || !description || !email || !contact || !address || !image) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if store already exists for user
    const existingStore = await prisma.store.findFirst({ where: { userId } });
    if (existingStore) {
      return NextResponse.json({ status: existingStore.status }, { status: 200 });
    }

    // Check if username is already taken
    const usernameTaken = await prisma.store.findFirst({ where: { username: username.toLowerCase() } });
    if (usernameTaken) {
      return NextResponse.json({ error: "Username is already taken." }, { status: 400 });
    }

    // Convert image to buffer
    let optimizedImageUrl = "";
    try {
      const buffer = Buffer.from(await image.arrayBuffer());
      const response = await imagekit.upload({
        file: buffer,
        fileName: image.name,
        folder: "logos",
      });

      optimizedImageUrl = imagekit.url({
        path: response.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "512" },
        ],
      });
    } catch (err) {
      console.error("ImageKit upload error:", err);
      return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
    }

    // Create new store
    const newStore = await prisma.store.create({
      data: {
        userId,
        name,
        description,
        username: username.toLowerCase(),
        email,
        contact,
        address,
        logo: optimizedImageUrl,
        status: "approved",
        isActive: true,
      },
    });

    // Connect store to user if relation exists
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { store: { connect: { id: newStore.id } } },
      });
    } catch (err) {
      console.warn("User-store relation update failed:", err);
    }

    return NextResponse.json({ success: true, message: "Applied, waiting for approval" }, { status: 200 });
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

    const store = await prisma.store.findFirst({ where: { userId } });
    if (store) {
      return NextResponse.json({ status: store.status }, { status: 200 });
    }

    return NextResponse.json({ status: "not registered" }, { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
