# Implementation Plan & Progress

> **Last Updated:** May 17, 2026
> **Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Neon PostgreSQL, Cloudinary, NextAuth v5, Resend

---

## Phase 1: Database Foundation ✅

| Step | Task | Status | Files |
|------|------|--------|-------|
| 1.1 | Install `@neondatabase/serverless` | ✅ Done | `package.json` |
| 1.2 | Create `lib/db.ts` with connection | ✅ Done | `lib/db.ts` |
| 1.3 | Write raw SQL migration (6 tables, 11 indexes) | ✅ Done | `db/migrations/001_initial.sql` |
| 1.4 | Create `db/migrate.ts` migration runner | ✅ Done | `db/migrate.ts` |
| 1.5 | Update `.env` with `DATABASE_URL` | ✅ Done | `.env`, `.env.example` |
| 1.6 | Add `db:migrate` script to `package.json` | ✅ Done | `package.json` |

**Schema Tables:** `users`, `products`, `product_images`, `product_variants`, `orders`, `order_items`, `migrations`

**Run migrations:** `npm run db:migrate`

---

## Phase 2: Product API Layer ✅

| Step | Task | Status | Files |
|------|------|--------|-------|
| 2.1 | `GET /api/products` — filter, sort, pagination (24/page) | ✅ Done | `app/api/products/route.ts` |
| 2.2 | `GET /api/products/[id]` — single product + images + variants | ✅ Done | `app/api/products/[id]/route.ts` |
| 2.3 | `GET /api/search` — full-text search | ✅ Done | `app/api/search/route.ts` |
| 2.4 | Update `app/page.tsx` to query DB | ✅ Done | `app/page.tsx` |
| 2.5 | Update `app/products/page.tsx` to query DB | ✅ Done | `app/products/page.tsx` |
| 2.6 | Update `app/products/[category]/page.tsx` to query DB | ✅ Done | `app/products/[category]/page.tsx` |
| 2.7 | Update `app/product/[id]/page.tsx` to query DB | ✅ Done | `app/product/[id]/page.tsx`, `ProductDetailClient.tsx` |
| 2.8 | Update `app/search/page.tsx` to query DB | ✅ Done | `app/search/page.tsx` |
| 2.9 | Create `lib/format.ts` for consistent response formatting | ✅ Done | `lib/format.ts` |
| 2.10 | Update `lib/data.ts` with new types (`Product`, `ProductImage`, `ProductVariant`) | ✅ Done | `lib/data.ts` |
| 2.11 | Add `formatPrice()` to `lib/utils.ts` (hides decimals when whole number) | ✅ Done | `lib/utils.ts` |

**Filters supported:** category, new arrivals, price range (min/max), size
**Sort options:** newest, price low-to-high, price high-to-low

---

## Phase 3: Cloudinary Integration ✅

| Step | Task | Status | Files |
|------|------|--------|-------|
| 3.1 | Install `cloudinary` SDK | ✅ Done | `package.json` |
| 3.2 | Create `lib/cloudinary.ts` with config | ✅ Done | `lib/cloudinary.ts` |
| 3.3 | `POST /api/upload` — image upload (max 5MB, jpg/png/webp) | ✅ Done | `app/api/upload/route.ts` |
| 3.4 | `DELETE /api/upload` — delete by `publicId` | ✅ Done | `app/api/upload/route.ts` |
| 3.5 | Update `.env` with Cloudinary vars | ✅ Done | `.env` |
| 3.6 | Auto-optimize URLs with `f_auto,q_auto,w_800` | ✅ Done | `lib/cloudinary.ts`, `lib/format.ts` |
| 3.7 | Images organized in `outfitterstore/products/` folder | ✅ Done | `lib/cloudinary.ts` |

**Env vars:** `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (also supports `CLOUDINARY_URL`)

---

## Phase 4: Authentication ✅

| Step | Task | Status | Files |
|------|------|--------|-------|
| 4.1 | Install `next-auth@beta`, `bcryptjs` | ✅ Done | `package.json` |
| 4.2 | `lib/auth.ts` — NextAuth config (Credentials, JWT, role) | ✅ Done | `lib/auth.ts` |
| 4.3 | `app/api/auth/[...nextauth]/route.ts` — Auth handlers | ✅ Done | `app/api/auth/[...nextauth]/route.ts` |
| 4.4 | `POST /api/auth/register` — user registration | ✅ Done | `app/api/auth/register/route.ts` |
| 4.5 | `app/(auth)/login/page.tsx` — login form | ✅ Done | `app/(auth)/login/page.tsx` |
| 4.6 | `app/(auth)/register/page.tsx` — registration form | ✅ Done | `app/(auth)/register/page.tsx` |
| 4.7 | `middleware.ts` — protect `/admin` routes | ✅ Done | `middleware.ts` |
| 4.8 | Update `Navbar` with login/logout state | ✅ Done | `components/Navbar.tsx` |
| 4.9 | Wrap layout with `SessionProvider` | ✅ Done | `app/layout.tsx` |
| 4.10 | Guest order tracking (`/order/track`) | ✅ Done | `app/order/track/page.tsx`, `app/api/orders/track/route.ts` |

**Auth details:**
- Email/password login with bcrypt hashing
- JWT sessions (30-day expiry, HTTP-only cookie)
- Role-based access (`customer`, `admin`)
- Guest checkout allowed; order tracking via email + order number
- First admin created via manual DB insertion

**Env var:** `AUTH_SECRET`

---

## Phase 5: Admin Panel ✅

| Step | Task | Status | Files |
|------|------|--------|-------|
| 5.1 | Admin layout + dashboard (stats, recent orders) | ✅ Done | `app/admin/layout.tsx`, `app/admin/page.tsx` |
| 5.2 | Product list table | ✅ Done | `app/admin/products/page.tsx` |
| 5.3 | Product create page with image upload | ✅ Done | `app/admin/products/new/page.tsx` |
| 5.4 | Product edit page with image upload, variants, delete | ✅ Done | `app/admin/products/[id]/page.tsx` |
| 5.5 | Order management list with status badges | ✅ Done | `app/admin/orders/page.tsx` |
| 5.6 | Order detail page with status update buttons | ✅ Done | `app/admin/orders/[id]/page.tsx` |
| 5.7 | `POST /api/admin/products` — create product | ✅ Done | `app/api/admin/products/route.ts` |
| 5.8 | `GET/PUT/DELETE /api/admin/products/[id]` — CRUD | ✅ Done | `app/api/admin/products/[id]/route.ts` |
| 5.9 | `PATCH /api/admin/orders` — update order status | ✅ Done | `app/api/admin/orders/route.ts` |
| 5.10 | `GET /api/admin/orders/[id]` — order detail | ✅ Done | `app/api/admin/orders/[id]/route.ts` |

**Features:**
- Sidebar navigation (Dashboard, Products, Orders)
- Dashboard: total revenue, order count, product count, low stock alerts, recent orders
- Product CRUD with Cloudinary image upload, variant management (size/color/stock)
- Order list with status badges, detail view with one-click status updates
- All routes protected by admin role check

---

## Phase 6: Order System ⏳ Pending

| Step | Task | Status | Files |
|------|------|--------|-------|
| 6.1 | `POST /api/orders` — create order with transaction, stock deduction | ⏳ | `app/api/orders/route.ts` |
| 6.2 | `GET /api/orders/[id]` — order status lookup | ⏳ | `app/api/orders/[id]/route.ts` |
| 6.3 | Update checkout page to call API instead of mock | ⏳ | `app/checkout/page.tsx` |
| 6.4 | Order confirmation page with order details | ⏳ | `app/order/[id]/page.tsx` |

**Clarification needed:**
- Order number format: sequential (`ORD-0001`), UUID, or date-based (`ORD-20260516-001`)?
- Stock behavior: reserve on order creation or deduct on confirmation?
- Shipping calculation: configurable in admin or hardcoded (free over PKR 15,000)?

---

## Phase 7: Email Notifications (Resend) ⏳ Pending

| Step | Task | Status | Files |
|------|------|--------|-------|
| 7.1 | Install Resend SDK, configure env | ⏳ | `package.json`, `.env` |
| 7.2 | Email templates (order confirmation, shipping update) | ⏳ | `lib/email/templates/` |
| 7.3 | Trigger emails on order creation/status change | ⏳ | `lib/email/index.ts` |

**Clarification needed:**
- Trigger events: order confirmation, status change, new order (admin), low stock alert?
- Sender email/domain (Resend requires verified domain)
- Template style: match app aesthetic or Resend defaults?

---

## Phase 8: Security Hardening ⏳ Pending

| Step | Task | Status | Files |
|------|------|--------|-------|
| 8.1 | `zod` validation on all API routes | ⏳ | `lib/validators.ts` |
| 8.2 | Rate limiting middleware | ⏳ | `middleware.ts` |
| 8.3 | Security headers in `next.config.ts` | ⏳ | `next.config.ts` |
| 8.4 | CSRF protection on state-changing routes | ⏳ | API routes |

**Clarification needed:**
- Rate limits: API (100 req/min), Auth (5 attempts/15min), Upload (10/hour)?
- File upload limits: max 5MB, formats jpg/png/webp (already implemented in upload route)

---

## Phase 9: SEO & Performance ⏳ Pending

| Step | Task | Status | Files |
|------|------|--------|-------|
| 9.1 | Dynamic metadata per product page | ⏳ | `app/product/[id]/page.tsx` (partial) |
| 9.2 | Sitemap + robots.txt generation | ⏳ | `app/sitemap.ts`, `app/robots.ts` |
| 9.3 | JSON-LD structured data for products | ⏳ | `app/product/[id]/` |
| 9.4 | Database indexes on common queries | ⏳ | `db/migrations/001_initial.sql` (done) |
| 9.5 | ISR caching with `revalidateTag` | ⏳ | API routes |

**Clarification needed:**
- Production domain (for sitemap, OG images)
- OG images: auto-generated (`@vercel/og`) or manual per product?
- Cache duration: 1h, 6h, 24h?

---

## Phase 10: Testing ⏳ Pending

| Step | Task | Status | Files |
|------|------|--------|-------|
| 10.1 | Install Vitest + Testing Library | ⏳ | `package.json` |
| 10.2 | Unit tests: cart, utils, validators | ⏳ | `tests/unit/` |
| 10.3 | Integration tests: API routes | ⏳ | `tests/integration/` |
| 10.4 | E2E tests: checkout flow (Playwright) | ⏳ | `tests/e2e/` |

**Clarification needed:**
- Test database: separate Neon branch or local PostgreSQL via Docker?
- CI/CD: GitHub Actions or manual testing only?

---

## Summary

| Phase | Status | Progress |
|-------|--------|----------|
| 1. Database Foundation | ✅ Complete | 100% |
| 2. Product API Layer | ✅ Complete | 100% |
| 3. Cloudinary Integration | ✅ Complete | 100% |
| 4. Authentication | ✅ Complete | 100% |
| 5. Admin Panel | ✅ Complete | 100% |
| 6. Order System | ⏳ Pending | 0% |
| 7. Email Notifications | ⏳ Pending | 0% |
| 8. Security Hardening | ⏳ Pending | 0% |
| 9. SEO & Performance | ⏳ Pending | 20% (indexes done, metadata partial) |
| 10. Testing | ⏳ Pending | 0% |

**Overall Progress:** ~50% complete
