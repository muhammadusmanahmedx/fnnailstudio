import { NextResponse } from "next/server";
import { connectToDatabase } from "@/config/db";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// PUT - Update product
export async function PUT(request, context) {
  try {
    await connectToDatabase();

    const { params } = context;
    const { id } = await params;

    const { userId } = getAuth(request);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Access denied. Please login." },
        { status: 401 }
      );
    }

    // Check if user is a seller
    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json(
        { success: false, message: "Access denied. Seller access required." },
        { status: 403 }
      );
    }

    // Check if product exists and user owns it
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    if (existingProduct.userId !== userId) {
      return NextResponse.json(
        { success: false, message: "Access denied. You can only edit your own products." },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const category = formData.get('category');
    const price = parseFloat(formData.get('price'));
    const offerPrice = parseFloat(formData.get('offerPrice'));
    const stockStatus = formData.get('stock');
    const stock = stockStatus === 'instock' ? 1 : 0;
    const existingImagesStr = formData.get('existingImages');
    
    // Parse existing images
    let existingImages = [];
    try {
      existingImages = existingImagesStr ? JSON.parse(existingImagesStr) : [];
    } catch (error) {
      console.error("Error parsing existing images:", error);
      existingImages = [];
    }

    // Validation
    if (!name || !description || !category || price === null || price === undefined || offerPrice === null || offerPrice === undefined || !stockStatus) {
      return NextResponse.json(
        { success: false, message: "All fields are required including stock status" },
        { status: 400 }
      );
    }

    if (price <= 0) {
      return NextResponse.json(
        { success: false, message: "Price must be greater than 0" },
        { status: 400 }
      );
    }

    if (offerPrice < 0) {
      return NextResponse.json(
        { success: false, message: "Offer price cannot be negative" },
        { status: 400 }
      );
    }

    if (offerPrice > 0 && offerPrice >= price) {
      return NextResponse.json(
        { success: false, message: "Offer price must be less than regular price" },
        { status: 400 }
      );
    }

    // Handle new image uploads
    const newImages = [];
    const imageFiles = formData.getAll('images');
    
    if (imageFiles && imageFiles.length > 0) {
      for (const file of imageFiles) {
        if (file && file.size > 0) {
          try {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            const uploadResponse = await new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream(
                {
                  resource_type: "image",
                  folder: "quickcart-products",
                },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                }
              ).end(buffer);
            });
            
            newImages.push(uploadResponse.secure_url);
          } catch (uploadError) {
            console.error("Error uploading image:", uploadError);
          }
        }
      }
    }

    // Combine existing images with new images
    const allImages = [...existingImages, ...newImages];

    if (allImages.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one image is required" },
        { status: 400 }
      );
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        description: description.trim(),
        category: category.trim(),
        price,
        offerPrice,
        stock,
        image: allImages,
        date: Date.now()
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update product" },
      { status: 500 }
    );
  }
}