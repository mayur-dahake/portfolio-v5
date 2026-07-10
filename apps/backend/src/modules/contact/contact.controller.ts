import type { Request, Response } from "express";
import nodemailer from "nodemailer";
import { env } from "../../config/env";
import { HttpStatus } from "../../common/constants/http";
import { ApiError } from "../../common/errors/api-error";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: env.SMTP_PORT === "465" || env.SMTP_PORT === "465",
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS
  }
});

export const contactController = {
  async sendEmail(req: Request, res: Response) {
    const { name, email, message } = req.body;

    if (!env.SMTP_USER || !env.SMTP_PASS) {
      throw new ApiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Email service is not configured (SMTP credentials missing)"
      );
    }

    try {
      const notificationInfo = await transporter.sendMail({
        from: `Portfolio Contact Form <${env.EMAIL_FROM}>`,
        to: env.CONTACT_EMAIL_TO,
        subject: `New Portfolio Message from ${name}`,
        replyTo: email,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Contact Form Submission</title>
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1f2937;">

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7fb;padding:40px 20px;">
<tr>
<td align="center">

<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">

<tr>
<td style="background:#111827;padding:28px;text-align:center;">
<h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;">
📩 New Contact Form Submission — ${name}
</h1>

<p style="margin:8px 0 0;color:#d1d5db;font-size:14px;">
Someone submitted your portfolio contact form.
</p>
</td>
</tr>

<tr>
<td style="padding:32px;">

<table width="100%" cellspacing="0" cellpadding="0">

<tr>
<td style="padding-bottom:22px;">
<p style="margin:0;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">
Name
</p>

<p style="margin:6px 0 0;font-size:16px;font-weight:600;color:#111827;">
${name}
</p>
</td>
</tr>

<tr>
<td style="padding-bottom:22px;">
<p style="margin:0;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">
Email
</p>

<p style="margin:6px 0 0;font-size:16px;">
<a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">
${email}
</a>
</p>
</td>
</tr>

<tr>
<td>
<p style="margin:0;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">
Message
</p>

<div style="margin-top:10px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:18px;white-space:pre-wrap;line-height:1.7;font-size:15px;color:#374151;">
${message}
</div>
</td>
</tr>

</table>

</td>
</tr>

<tr>
<td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:20px 32px;">

<table width="100%" cellspacing="0" cellpadding="0">

<tr>
<td style="font-size:13px;color:#6b7280;">
<b>Received:</b> ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })}
</td>
</tr>

<tr>
<td style="padding-top:8px;font-size:13px;color:#6b7280;">
<b>Website:</b> mdevhub.dev
</td>
</tr>

<tr>
<td style="padding-top:8px;font-size:13px;color:#6b7280;">
This email was automatically generated from your website contact form.
</td>
</tr>

</table>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>`
      });

      // 2. Send auto-reply to the visitor
      try {
        await transporter.sendMail({
          from: `Mayur Dahake <${env.EMAIL_FROM}>`,
          to: email,
          subject: "Thanks for reaching out 👋",
          html: `<!DOCTYPE html>
<html>
<body style="margin:0;padding:40px;background:#f4f7fb;font-family:Arial,sans-serif;">

<table width="600" align="center" style="background:#fff;border-radius:12px;padding:40px;">

<tr>
<td>

<h2 style="margin-top:0;color:#111827;">
Hi ${name},
</h2>

<p style="font-size:16px;line-height:1.7;color:#374151;">
Thank you for reaching out through my website.
</p>

<p style="font-size:16px;line-height:1.7;color:#374151;">
I've received your message and will get back to you as soon as possible, usually within <strong>24–48 hours</strong>.
</p>

<div style="background:#f9fafb;border-left:4px solid #2563eb;padding:18px;margin:28px 0;">
<strong>Your Message</strong>

<p style="white-space:pre-wrap;line-height:1.7;">
${message}
</p>
</div>

<p style="font-size:16px;color:#374151;">
Looking forward to connecting with you.
</p>

<p style="margin-top:30px;">
Best regards,<br>
<strong>Mayur Dahake</strong><br>
Software Engineer
</p>

</td>
</tr>

</table>

</body>
</html>`
        });
      } catch (autoReplyErr) {
        console.warn("Auto-reply failed:", autoReplyErr);
      }

      res
        .status(HttpStatus.OK)
        .json({ success: true, messageId: notificationInfo.messageId });
    } catch (err) {
      console.error("Error sending email:", err);
      throw new ApiError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "An unexpected error occurred while sending the email"
      );
    }
  }
};
