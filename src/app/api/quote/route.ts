import { NextResponse } from "next/server";
import { Resend } from "resend";
import { quoteSchema } from "@/lib/quoteSchema";
import { isRateLimited } from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Try again shortly." },
        { status: 429 },
      );
    }

    const payload = await request.json();
    const parsed = quoteSchema.safeParse(payload);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Invalid form data";
      return NextResponse.json({ ok: false, error: firstError }, { status: 400 });
    }

    if (parsed.data.website.trim()) {
      return NextResponse.json({ ok: true });
    }

    const toEmail = process.env.QUOTE_TO_EMAIL;
    const fromEmail =
      process.env.QUOTE_FROM_EMAIL ?? "Top Notch Quotes <quotes@updates.example.com>";

    if (!toEmail || !process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const { name, email, address, phone, description } = parsed.data;

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New quote request from ${name}`,
      replyTo: email,
      text: [
        "New quote request",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Address: ${address}`,
        "",
        "Description:",
        description,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not submit your quote right now." },
      { status: 500 },
    );
  }
}
