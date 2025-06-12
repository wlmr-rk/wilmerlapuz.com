// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sql } from "@vercel/postgres"; // Use the Vercel Postgres SDK

// Instantiate Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "wilmer.lapuz@gmail.com";
const FROM_EMAIL = "onboarding@resend.dev"; // Resend's default for testing

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
    // This part only runs if the database write was successful.
    const { error: emailError } = await resend.emails.send({
      from: `Portfolio Contact <${FROM_EMAIL}>`,
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
