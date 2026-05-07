// import { openai } from "@/configs/openai";
// import authSeller from "@/middlewares/authSeller";
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// async function main(base64Image, mimeType) {
//   const messages = [
//     {
//       role: "system",
//       content: `
//         You are a product listing assistant for an e-commerce store.
//         Your job is to analyze an image of a product and generate
//         structured data.

//         Respond only with raw JSON (no code block , no markdown , no explanation).

//         The JSON must strictly follow this schema:
//         {
//           "name" : string,        // short product name
//           "description" : string  // Marketing friendly description of product
//         }
//       `,
//     },
//     {
//       role: "user",
//       content: [
//         {
//           type: "text",
//           text: "Analyze this image and  return name + description",
//         },
//         {
//           type: "image_url",
//           image_url: {
//             url: `${mimeType};base64,${base64Image}`,
//           },
//         },
//       ],
//     },
//   ];
//   // <-- you were missing this closing curly brace for main()
//    const response = await openai.chat.completions.create({
//       model: process.env.OPENAI_MODEL,
//       messages,
//     });

//    const raw = response.choices[0].message.content

//    const cleaned = raw.replace(/```json```/g,"").trim();
//    let parsed;

// try {
//   parsed = JSON.parse(cleaned)
// } catch (error) {
//    throw new Error("Ai did not return balid json")
// }
// return parsed;

// }

// export async function POST(request) {
//   try {
//     const { userId } = getAuth(request);

//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const isSeller = await authSeller(userId);

//     if (!isSeller) {
//       return NextResponse.json({ error: "not Authorised" }, { status: 401 });
//     }

//     const { base64Image, mimeType } = await request.json();
//     const result =await main(base64Image,mimeType)

//     return NextResponse.json({...result})

//   } catch (error) {
//     console.error("POST error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { openai } from "@/configs/openai";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

async function main(base64Image, mimeType) {
  const messages = [
    {
      role: "system",
      content: `
        You are a product listing assistant for an e-commerce store.
        Your job is to analyze an image of a product and generate
        structured data.

        Respond only with raw JSON (no code block, no markdown, no explanation).

        The JSON must strictly follow this schema:
        {
          "name": string,         // short product name
          "description": string   // Marketing friendly description of product
        }
      `,
    },
    {
      role: "user",
      content: [
        { type: "text", text: "Analyze this image and return name + description" },
        {
          type: "image_url",
          image_url: {
            url: `data:${mimeType};base64,${base64Image}`, // ✅ fixed
          },
        },
      ],
    },
  ];

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gemini-1.5-pro", // ✅ fallback to gemini model
    messages,
  });

  const raw = response.choices[0].message?.content || "";

  const cleaned = raw.replace(/```json|```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error("AI raw output:", raw); // ✅ log for debugging
    throw new Error("AI did not return valid JSON");
  }

  return parsed;
}

export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json({ error: "Not Authorised" }, { status: 401 });
    }

    const { base64Image, mimeType } = await request.json();

    const result = await main(base64Image, mimeType);

    return NextResponse.json(result);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
