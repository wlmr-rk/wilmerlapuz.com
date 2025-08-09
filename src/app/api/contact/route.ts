// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sql } from "@vercel/postgres"; // Use the Vercel Postgres SDK

// Instantiate Resend only if the API key is available
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
const TO_EMAIL = "wilmer.lapuz@gmail.com";
const FROM_EMAIL = "onboarding@wilmerlapuz.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, subject, message } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // --- 1. SAVE TO DATABASE ---
    // The `sql` template is sanitized against SQL injection.
    try {
      await sql`
        INSERT INTO contact_submissions (name, email, company, subject, message)
        VALUES (${name}, ${email}, ${company}, ${subject}, ${message});
      `;
    } catch (dbError) {
      console.error("Database Error:", dbError);
      // Return a server error if the database write fails
      return NextResponse.json(
        { error: "Failed to save submission to the database." },
        { status: 500 },
      );
    }

    // --- 2. SEND EMAIL NOTIFICATION ---
    if (!resend) {
      console.warn(
        "Resend API key is missing or invalid. Skipping email notification.",
      );
      // The submission is saved, but email is disabled.
      // Return a multi-status response to indicate partial success.
      return NextResponse.json(
        { message: "Submission saved, but email notification is disabled." },
        { status: 207 },
      );
    }

    const { error: emailError } = await resend.emails.send({
      from: `Wilmer Lapuz <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `New Portfolio Contact: ${subject}`,
      text: `New submission saved to database.
---
Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Subject: ${subject}
---
Message:
${message}
      `,
    });

    if (emailError) {
      console.error("Resend API Error:", emailError);
      // Important: The data IS in the database, but the email failed.
      // This is still a partial success.
      return NextResponse.json(
        { message: "Submission saved, but email notification failed." },
        { status: 207 }, // 207 Multi-Status is a good code for this
      );
    }

    // --- 3. SEND SUCCESS RESPONSE ---
    return NextResponse.json({
      message: "Submission successful!",
    });
  } catch (err) {
    console.error("API Route Error:", err);
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
