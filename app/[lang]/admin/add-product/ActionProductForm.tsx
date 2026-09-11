'use server';

import { addProduct } from "@/lib/shopdb";
import cloudinary from "@/lib/cloudinary";
import { redirect } from "next/navigation";

type PrevState = {
  error?: string
} | null;

export default async function addProductAction(lang: string, prevState: PrevState, formData: FormData) {
  const image = formData.get('image') as File;
  
  if (!image || image.size === 0) {
    throw new Error('image is required');
  }

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
  
  const name = formData.get('name');
  const price = formData.get('price');
  const stock = formData.get('stock');
  const category = formData.get('category');
  const description = formData.get('description');
  
  if (
    !name ||
    !price ||
    !stock ||
    !category ||
    !description ||
    !image ||
    !imageUrl
  ) {
    return { error: 'Fields must not be empty.' }
  }
  
  addProduct(
    String(name),
    Number(price) * 100,
    Number(stock),
    String(category),
    String(description),
    imageUrl
  );
  
  redirect(`/${lang}/admin/products`);
}