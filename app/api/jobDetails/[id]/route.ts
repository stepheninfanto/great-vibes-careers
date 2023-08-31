import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, response: NextResponse) {
  const deleteId = request.url.slice(request.url.lastIndexOf("/") + 1);

  const res = await fetch(`${process.env.BASE_API_URL}jobDetails/${deleteId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    cache: "no-store",
  });

  const data = await res.json();

  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const id = request.url.slice(request.url.lastIndexOf("/") + 1);
  // const process.env.BASE_API_URL = "https://640c42aaa3e07380e8f01cc7.mockapi.io/";
  const res = await fetch(`${process.env.BASE_API_URL}jobDetails/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(body),
  });

  const data = await res.json();
  console.log(data);

  return NextResponse.json(data);
}
