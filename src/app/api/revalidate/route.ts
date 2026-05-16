import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/articles");

  if (body.slug) {
    revalidatePath(`/articles/${body.slug}`);
  }

  return NextResponse.json({ revalidated: true });
}
