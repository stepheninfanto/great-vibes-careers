import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  // const process.env.BASE_API_URL = "https://640c42aaa3e07380e8f01cc7.mockapi.io/";
  const res = await fetch(`${process.env.BASE_API_URL}jobDetails`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return NextResponse.json({ data });
}

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();

  // const process.env.BASE_API_URL = "https://640c42aaa3e07380e8f01cc7.mockapi.io/";
  const res = await fetch(process.env.BASE_API_URL + `${"jobDetails"}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json(data);
}
