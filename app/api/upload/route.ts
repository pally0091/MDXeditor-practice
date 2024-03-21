import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    let imageBuffer: Buffer;

    if (image instanceof File) {
      const imageBuf = await image.arrayBuffer();
      imageBuffer = Buffer.from(imageBuf);
    } else {
      // Handle the case where image is a string or other type
      return NextResponse.json(
        { error: "Invalid image data" },
        { status: 400 }
      );
    }

    const imageName = image.name;
    const uploadPath = path.join(process.cwd(), "public", "uploads", imageName);

    await fs.promises.writeFile(uploadPath, imageBuffer);

    const imageUrl = `/uploads/${imageName}`;
    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Error uploading image" },
      { status: 500 }
    );
  }
}
