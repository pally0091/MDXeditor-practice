import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newContent = body.content;

    if (!newContent) {
      return NextResponse.json(
        { error: "No content provided" },
        { status: 400 }
      );
    }

    const fileName = "contents.json";
    const filePath = path.join(process.cwd(), "public", "contents", fileName);

    // Read existing data from the file, or initialize an empty array
    let existingData = [];
    if (fs.existsSync(filePath)) {
      existingData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    // Add the new content to the end of the array
    existingData.push(newContent);

    // Write the updated data to the file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), "utf8");

    console.log("Content saved successfully");
    return NextResponse.json({ message: "Content saved successfully" });
  } catch (error) {
    console.error("Error saving data", error);
    return NextResponse.json(
      { error: "Error saving content" },
      { status: 500 }
    );
  }
}
