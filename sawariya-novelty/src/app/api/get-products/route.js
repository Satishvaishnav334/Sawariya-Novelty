import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/connect.js';
import Product from '../models/Product.js';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Convert buffer to readable stream
const bufferToStream = (buffer) => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

// GET all products
export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).populate('category');
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST - create new product
export async function POST(request) {
  try {
    await connectToDatabase();
    const formData = await request.formData();

    // Fields
    const name = formData.get('name');
    const baseSlug = formData.get('slug') || name.toLowerCase().replace(/\s+/g, '-');
    const description = formData.get('description');
    const price = parseFloat(formData.get('price'));
    const category = formData.get('category');
    const brand = formData.get('brand');
    const stock = parseInt(formData.get('stock'), 10);
    const sizes = formData.getAll('sizes') || [];
    const colors = formData.getAll('colors') || [];

    // Ensure slug is unique
    let slug = baseSlug;
    let count = 1;
    while (await Product.exists({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    // Image upload
    const file = formData.get('image');
    let image = {};

    if (file && typeof file === 'object') {
      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'products' },
          (error, result) => {
            console.log(error)
            console.log(result)
            if (error) reject(error);
            else resolve(result);
          }
        );
        bufferToStream(buffer).pipe(stream);
      });


      image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // Save to MongoDB
    const product = await Product.create({
      name,
      slug,
      description,
      price,
      category,
      brand,
      stock,
      images: image?.url ? [image] : [],
      sizes,
      colors,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.log('❌ Product creation failed:', error);
    return NextResponse.json({ error: 'Product creation failed', error }, { status: 500 });
  }
}
