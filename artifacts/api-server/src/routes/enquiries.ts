import { Router, type IRouter } from "express";
import { lookup } from "node:dns/promises";
import nodemailer from "nodemailer";

const router: IRouter = Router();

type EnquiryPayload = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

function readRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is required for enquiry email delivery`);
  }
  return value;
}

function validatePayload(body: unknown): EnquiryPayload {
  if (!body || typeof body !== "object") {
    throw new Error("Invalid request body");
  }

  const payload = body as Record<string, unknown>;
  const firstName = String(payload.firstName ?? "").trim();
  const lastName = String(payload.lastName ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();

  if (!firstName || !lastName || !email || !message) {
    throw new Error("All enquiry fields are required");
  }

  return { firstName, lastName, email, message };
}

async function resolveSmtpTarget(host: string): Promise<{
  connectHost: string;
  servername: string;
}> {
  try {
    const resolved = await lookup(host, { family: 4 });
    return {
      connectHost: resolved.address,
      servername: host,
    };
  } catch {
    return {
      connectHost: host,
      servername: host,
    };
  }
}

router.post("/enquiries", async (req, res) => {
  try {
    const payload = validatePayload(req.body);
    const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
    const requestedPort = Number(process.env.SMTP_PORT?.trim() || "465");
    const requestedSecure = process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : requestedPort === 465;
    const isGmailHost = /(^|\.)gmail\.com$/i.test(host);
    const port = isGmailHost && requestedPort === 465 ? 587 : requestedPort;
    const secure =
      isGmailHost && requestedPort === 465 ? false : requestedSecure;

    const user = readRequiredEnv("SMTP_USER");
    const pass = readRequiredEnv("SMTP_PASS");
    const from = process.env.SMTP_FROM?.trim() || user;
    const to = process.env.ENQUIRY_TO?.trim() || "asuhail1712@gmail.com";
    const smtpTarget = await resolveSmtpTarget(host);

    const transporter = nodemailer.createTransport({
      host: smtpTarget.connectHost,
      port,
      secure,
      family: 4,
      auth: { user, pass },
      requireTLS: !secure,
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
      tls: {
        servername: smtpTarget.servername,
      },
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: payload.email,
      subject: `Dayal Sports Academy enquiry from ${payload.firstName} ${payload.lastName}`,
      text: [
        `First Name: ${payload.firstName}`,
        `Last Name: ${payload.lastName}`,
        `Email: ${payload.email}`,
        "",
        "Message:",
        payload.message,
      ].join("\n"),
      html: `
        <h2>New Dayal Sports Academy enquiry</h2>
        <p><strong>First Name:</strong> ${payload.firstName}</p>
        <p><strong>Last Name:</strong> ${payload.lastName}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Message:</strong></p>
        <p>${payload.message.replace(/\n/g, "<br />")}</p>
      `,
    });

    res.status(202).json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send enquiry email";

    res.status(500).json({
      ok: false,
      message,
    });
  }
});

export default router;
