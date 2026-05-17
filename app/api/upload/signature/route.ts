import { cloudinary } from '@/lib/cloudinary';
import { NextRequest, NextResponse } from 'next/server';

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 100;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function getRateLimit(ip: string) {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  entry.count++;
  if (entry.count > MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const limit = getRateLimit(ip);

  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Upload limit reached. Try again later.' },
      { status: 429 }
    );
  }

  const timestamp = Math.round(new Date().getTime() / 1000);

  const paramsToSign = {
    timestamp,
    folder: 'menace/products',
    allowed_formats: 'jpg,jpeg,png,webp',
    max_file_size: 104857600, // 100MB (Cloudinary free tier max)
    max_image_width: 5000,
    max_image_height: 5000,
    overwrite: false,
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  );

  return NextResponse.json({
    signature,
    timestamp,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder: paramsToSign.folder,
    allowedFormats: paramsToSign.allowed_formats,
    maxFileSize: paramsToSign.max_file_size,
  });
}
