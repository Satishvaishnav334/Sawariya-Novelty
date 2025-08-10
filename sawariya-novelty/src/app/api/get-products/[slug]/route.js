import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/connect.js';
import Member from '../../models/users.js';
import Product from '../../models/Product.js';

export async function GET(req, { params }) {
    try {
        await connectToDatabase();
        const { slug } = await params;
        const data = await Product.findOne({ slug });
        return NextResponse.json(data, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
export async function DELETE(req, { params }) {
    try {
        await connectToDatabase();
        console.log(slug,'dli')
        const data = await Product.findOneAndDelete({ slug });
        return NextResponse.json(data, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}