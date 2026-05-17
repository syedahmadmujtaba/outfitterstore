import { query } from '@/lib/db';
import { formatProduct } from '@/lib/format';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 3600; // 1 hour ISR

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get('q');

  if (!q || q.trim().length === 0) {
    return NextResponse.json({ data: [], meta: { total: 0, query: '' } });
  }

  const searchTerm = `%${q.trim().toLowerCase()}%`;

  const results = await query(`
    SELECT
      p.id,
      p.name,
      p.description,
      p.price,
      p.category,
      p.featured,
      p.new_arrival AS "newArrival",
      json_agg(
        json_build_object(
          'id', pi.id,
          'url', pi.cloudinary_url,
          'alt', pi.alt_text,
          'sortOrder', pi.sort_order
        ) ORDER BY pi.sort_order
      ) FILTER (WHERE pi.id IS NOT NULL) AS images
    FROM products p
    LEFT JOIN product_images pi ON pi.product_id = p.id
    WHERE
      LOWER(p.name) LIKE $1 OR
      LOWER(p.description) LIKE $1 OR
      LOWER(p.category) LIKE $1 OR
      EXISTS (
        SELECT 1 FROM product_variants pv
        WHERE pv.product_id = p.id AND LOWER(pv.color) LIKE $1
      )
    GROUP BY p.id
    ORDER BY p.created_at DESC
    LIMIT 50
  `, [searchTerm]);

  const formatted = results.map(formatProduct);

  return NextResponse.json({
    data: formatted,
    meta: { total: formatted.length, query: q.trim() },
  });
}
