import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/connect';
import Category from '../models/Category';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary
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

// GET: Fetch all categories
export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find({ isActive: true });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Create a new category
export async function POST(req) {
  try {
    await connectToDatabase();
    const formData = await req.formData();
    const name = formData.get('name');
    const slug = formData.get('slug');
    const description = formData.get('description');
    const file = formData.get('image');

    let image = {};

    if (file && typeof file === 'object') {
      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'categories' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        bufferToStream(buffer).pipe(stream);
      });

      image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const category = await Category.create({
      name,
      slug,
      description,
      image,
      isActive: true,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Category creation failed' }, { status: 500 });
  }
}
