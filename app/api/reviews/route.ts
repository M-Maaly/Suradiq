import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { writeClient } from "@/sanity/lib/write-client";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { productId, rating, comment } = await req.json();

    if (!productId || typeof rating !== "number" || rating < 1 || rating > 5) {
      return new NextResponse("Invalid payload", { status: 400 });
    }

    const userName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.emailAddresses[0]?.emailAddress || "Anonymous";

    // Remove any existing review by this user, then append the new one
    await writeClient
      .patch(productId)
      .setIfMissing({ reviews: [] })
      .unset([`reviews[userId == "${userId}"]`]) // Remove previous review if it exists
      .append("reviews", [
        {
          _key: crypto.randomUUID(),
          userId,
          userName,
          rating,
          comment,
          createdAt: new Date().toISOString(),
        },
      ])
      .commit();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[REVIEWS_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
