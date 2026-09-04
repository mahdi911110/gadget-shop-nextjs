'use server';

import { editProduct } from "@/lib/shopdb";
import cloudinary from "@/lib/cloudinary";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

type PrevState = {
  error: string;
  success?: undefined;
} | {
  success: boolean;
  error?: undefined;
} | null;

export default async function saveAction(productId: number, prevState: PrevState, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }
  
  if (user.role !== 'admin') {
    redirect('/');
  }

  const name = formData.get('name');
  const price = formData.get('price');
  const stock = formData.get('stock');
  const category = formData.get('category');
  const description = formData.get('description');

  const image = formData.get('image') as File;
  
  if (
    !name ||
    !price ||
    !stock ||
    !category ||
    !description
  ) {
    return { error: 'Fields must not be empty.' }
  }

  if(image && image.size > 0){
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
  
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'shop/products',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });
  
    const imageUrl = (result as {secure_url: string}).secure_url;
    
    editProduct(
      productId,
      String(name),
      Math.round(Number(price)) * 100,
      Number(stock),
      String(category),
      String(description),
      imageUrl
    );

    redirect('/admin/products');
  }
  
  editProduct(
    productId,
    String(name),
    Math.round(Number(price)) * 100,
    Number(stock),
    String(category),
    String(description)
  );
  
  redirect('/admin/products');
}