import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

// Issues short-lived client upload tokens so the browser can upload files
// for a Made4U request directly to Vercel Blob (bypassing serverless
// function body-size limits). Requires BLOB_READ_WRITE_TOKEN to be set —
// add a Blob store to this Vercel project to get one automatically.
export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("made4u/")) {
          throw new Error("Invalid upload path.");
        }
        return {
          addRandomSuffix: true,
          maximumSizeInBytes: 50 * 1024 * 1024,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Made4U file uploaded:", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (err) {
    console.error("Made4U blob upload token generation failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed." },
      { status: 400 }
    );
  }
}
