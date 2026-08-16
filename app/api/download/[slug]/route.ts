import { readFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json(
      { error: "Missing checkout session." },
      { status: 400 }
    );
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (err) {
    console.error("Failed to retrieve checkout session:", err);
    return NextResponse.json(
      { error: "Could not verify your purchase." },
      { status: 400 }
    );
  }

  if (session.payment_status !== "paid" || session.metadata?.slug !== slug) {
    return NextResponse.json(
      { error: "Purchase could not be verified for this product." },
      { status: 403 }
    );
  }

  try {
    const filePath = path.join(process.cwd(), "public", "downloads", product.fileName);
    const file = await readFile(filePath);
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${product.fileName}"`,
      },
    });
  } catch (err) {
    console.error("Failed to read product file:", err);
    return NextResponse.json(
      { error: "Download file is missing on the server." },
      { status: 500 }
    );
  }
}
