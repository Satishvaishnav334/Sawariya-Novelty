import { NextRequest,NextResponse } from "next/server";
export async function POST(req,{params}) {
    try{
        const data = req.body
        console.log(data)
        return NextResponse.json(data, { status: 200 });
    }
    catch(error){
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}