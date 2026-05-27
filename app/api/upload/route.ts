import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const productId = formData.get("productId") as string;

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    if (files.length > 10) {
      return NextResponse.json({ error: "Maximum 10 images allowed" }, { status: 400 });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        return NextResponse.json({ error: `${file.name} is not an image file` }, { status: 400 });
      }

      // Validate file size (5MB per file)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: `${file.name} exceeds 5MB limit` }, { status: 400 });
      }

      // Create unique filename
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(7);
      const extension = file.name.split(".").pop();
      const filename = `${productId}/${timestamp}-${random}.${extension}`;

      // Convert file to buffer
      const buffer = await file.arrayBuffer();

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage.from("product-images").upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

      if (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: `Failed to upload ${file.name}` }, { status: 500 });
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage.from("product-images").getPublicUrl(filename);

      uploadedUrls.push(publicUrlData.publicUrl);
    }

    return NextResponse.json({ urls: uploadedUrls }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL required" }, { status: 400 });
    }

    // Extract path from URL
    const urlParts = imageUrl.split("/storage/v1/object/public/product-images/");
    if (urlParts.length !== 2) {
      return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
    }

    const filePath = urlParts[1];

    // Delete from Supabase Storage
    const { error } = await supabase.storage.from("product-images").remove([filePath]);

    if (error) {
      console.error("Delete error:", error);
      return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
