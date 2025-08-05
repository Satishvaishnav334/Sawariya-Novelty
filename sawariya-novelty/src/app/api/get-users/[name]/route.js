import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/connect.js';
import Member from '../../models/users.js';
import teamModel from '../../models/Category.js';
import taskModel from '../../models/Product.js';
export async function GET(req, { params }) {
    try {
        await connectToDatabase();
        teamModel;
        taskModel;
         Member;
        const { name } = await params;
        const data = await Member.findOne({ name })
        return NextResponse.json(data, { status: 200 });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}