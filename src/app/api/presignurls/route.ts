import { db } from "@/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/app/helpers/s3client";

// ADD this route in middleware

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  const type = request.nextUrl.searchParams.get("type");

  // throw new Error();

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: key as string,
      ContentType: type as string,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 28800 });
    console.log(url);
    return NextResponse.json({ url });
  } catch (error) {
    return new Error("Something went wrong");
  }
}

// TODO: Create POST request for get opbject pre sign url