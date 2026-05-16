import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase";

// Lazy init so the module loads during build even without env vars
function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email: string = (body.email ?? "").trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const admin = createAdminClient();

  // Save to Supabase (upsert so duplicate submissions don't error)
  const { error: dbError } = await admin
    .from("emails")
    .upsert({ email }, { onConflict: "email", ignoreDuplicates: true });

  if (dbError) {
    console.error("Email save error:", dbError);
    return NextResponse.json({ error: "Failed to save email" }, { status: 500 });
  }

  // Send welcome email via Resend
  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_placeholder") {
    try {
      await getResend().emails.send({
        from: "PeptidesMasters <hello@peptidesmasters.com>",
        to: email,
        subject: "Welcome to PeptidesMasters — Here's What to Read First",
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#111827">
            <h1 style="font-size:22px;font-weight:800;margin:0 0 8px 0">Welcome to PeptidesMasters</h1>
            <p style="color:#6B7280;font-size:14px;margin:0 0 24px 0">The most trusted educational resource for peptide research.</p>
            <hr style="border:none;border-top:1px solid #E5E7EB;margin:0 0 24px 0"/>
            <p style="font-size:15px;line-height:1.7;margin:0 0 16px 0">
              You're now subscribed to weekly peptide research updates — cited, objective, and jargon-free.
            </p>
            <p style="font-size:15px;line-height:1.7;margin:0 0 24px 0">Here are three articles to start with:</p>
            <ul style="padding:0;margin:0 0 24px 0;list-style:none">
              <li style="margin-bottom:12px">
                <a href="https://peptidesmasters.com/articles/bpc-157-complete-research-review" style="color:#FD6C68;font-weight:600;text-decoration:none">
                  BPC-157: Everything the Research Says
                </a>
              </li>
              <li style="margin-bottom:12px">
                <a href="https://peptidesmasters.com/articles/are-peptides-legal-us-2026" style="color:#FD6C68;font-weight:600;text-decoration:none">
                  Are Peptides Legal in the US? The 2026 Breakdown
                </a>
              </li>
              <li style="margin-bottom:12px">
                <a href="https://peptidesmasters.com/articles/how-to-read-coa" style="color:#FD6C68;font-weight:600;text-decoration:none">
                  How to Read a Peptide Certificate of Analysis
                </a>
              </li>
            </ul>
            <hr style="border:none;border-top:1px solid #E5E7EB;margin:0 0 16px 0"/>
            <p style="color:#9CA3AF;font-size:12px;margin:0">
              PeptidesMasters.com · For research and educational purposes only · Not medical advice
            </p>
          </div>
        `,
      });

      await admin.from("emails").update({ welcome_sent: true }).eq("email", email);
    } catch (err) {
      // Email failed but subscription is saved — not fatal
      console.error("Welcome email error:", err);
    }
  }

  return NextResponse.json({ success: true });
}
