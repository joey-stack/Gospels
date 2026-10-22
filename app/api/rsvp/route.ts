import { NextRequest, NextResponse } from "next/server";
import { submitRSVP } from "@/app/actions";

export async function POST(req: NextRequest) {
  try {
    let formData: FormData;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const json = await req.json();
      formData = new FormData();
      Object.entries(json).forEach(([key, val]) => {
        formData.append(key, String(val));
      });
    } else {
      formData = await req.formData();
    }

    const result = await submitRSVP(formData);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("API /api/rsvp error:", err);
    return NextResponse.json(
      {
        success: false,
        message: err.message || "Failed to process registration.",
      },
      { status: 500 }
    );
  }
}
