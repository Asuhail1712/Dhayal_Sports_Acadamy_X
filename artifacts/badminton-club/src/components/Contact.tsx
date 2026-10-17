import React, { useId, useState } from "react";
import { MapPin, Phone, Mail, Send, MessageCircle } from "lucide-react";
import { useSearch } from "wouter";
import { enquiryInterests, whatsappUrl } from "@/lib/academy-content";
import { buildEnquiryPayload } from "@/lib/enquiry";
import { Reveal } from "@/components/Design";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || "";
const fallbackApiBaseUrl = "https://dhayal-sports-acadamy-x-api.onrender.com";
const localApiBaseUrl = "http://127.0.0.1:3001";
const fallbackEnquiryEmail =
  import.meta.env.VITE_ENQUIRY_TO?.trim() || "businesscoridoor@gmail.com";

const apiBaseCandidates = Array.from(
  new Set(
    [
      configuredApiBaseUrl,
      import.meta.env.DEV ? localApiBaseUrl : "",
      fallbackApiBaseUrl,
    ].filter(Boolean),
  ),
);

function NeonShuttlecockLoader() {
  return (
    <svg
      className="shuttle-loader-icon"
      viewBox="0 0 64 64"
      width="28"
      height="28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter
          id="shuttle-glow"
          x="0"
          y="0"
          width="64"
          height="64"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="1.8"
            floodColor="#E8F0FF"
            floodOpacity="0.7"
          />
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="3"
            floodColor="#2151A3"
            floodOpacity="0.65"
          />
        </filter>
      </defs>
      <g
        filter="url(#shuttle-glow)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M32 37L16 12" stroke="#E8F0FF" strokeWidth="2.5" />
        <path d="M32 37L23 10" stroke="#E8F0FF" strokeWidth="2.5" />
        <path d="M32 37L32 8" stroke="#E8F0FF" strokeWidth="2.5" />
        <path d="M32 37L41 10" stroke="#E8F0FF" strokeWidth="2.5" />
        <path d="M32 37L48 12" stroke="#E8F0FF" strokeWidth="2.5" />
        <path d="M32 37L12 19" stroke="#E8F0FF" strokeWidth="2.1" />
        <path d="M32 37L52 19" stroke="#E8F0FF" strokeWidth="2.1" />
        <path d="M20 27L27 16" stroke="#00B050" strokeWidth="1.5" />
        <path d="M27 33L32 16" stroke="#00B050" strokeWidth="1.5" />
        <path d="M37 33L32 16" stroke="#00B050" strokeWidth="1.5" />
        <path d="M44 27L37 16" stroke="#00B050" strokeWidth="1.5" />
        <path d="M24 39H40" stroke="#2151A3" strokeWidth="3" />
        <path
          d="M26 39H38V48C38 50.2091 36.2091 52 34 52H30C27.7909 52 26 50.2091 26 48V39Z"
          stroke="#2151A3"
          strokeWidth="2.8"
        />
      </g>
    </svg>
  );
}

export function Contact({ detailed = false }: { detailed?: boolean }) {
  const Heading = detailed ? "h1" : "h2";
  const search = useSearch();
  const params = new URLSearchParams(search);
  const requestedInterest = params.get("interest") || "";
  const requestedRole = params.get("role") || "";
  const initialInterest =
    enquiryInterests.find((interest) => interest === requestedInterest) || "";
  const { toast } = useToast();
  const formId = useId();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openMailFallback = (payload: {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  }) => {
    const subject = `Dayal Sports Academy enquiry from ${payload.firstName} ${payload.lastName}`;
    const body = [
      `First Name: ${payload.firstName}`,
      `Last Name: ${payload.lastName}`,
      `Email: ${payload.email}`,
      "",
      "Message:",
      payload.message,
    ].join("\n");

    window.location.href = `mailto:${encodeURIComponent(
      fallbackEnquiryEmail,
    )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = buildEnquiryPayload({
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      interest: String(formData.get("interest") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    });

    try {
      let lastError: Error | null = null;
      let delivered = false;

      for (const apiBaseUrl of apiBaseCandidates) {
        try {
          const response = await fetch(`${apiBaseUrl}/api/enquiries`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const data = (await response.json().catch(() => null)) as {
            message?: string;
          } | null;

          if (!response.ok) {
            throw new Error(data?.message || "Unable to send enquiry");
          }

          delivered = true;
          break;
        } catch (error) {
          lastError =
            error instanceof Error
              ? error
              : new Error("Unable to send enquiry");
        }
      }

      if (!delivered) {
        throw lastError || new Error("Unable to send enquiry");
      }

      toast({
        title: "Enquiry Sent",
        description: "Your enquiry has been delivered successfully.",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      const description =
        error instanceof Error
          ? error.message
          : "Unable to send enquiry right now. Please try again.";

      openMailFallback(payload);

      toast({
        title: "Email App Opened",
        description:
          description === "Unable to send enquiry right now. Please try again."
            ? "We opened your email app with the enquiry prefilled as a fallback."
            : `We opened your email app because the direct send failed: ${description}`,
        variant: "default",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-shell section-soft contact-section accent-green"
    >
      <div className="site-container">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
          <Reveal>
            <div className="eyebrow">
              <span />
              Get in touch
            </div>
            <Heading className="section-title">
              Talk to <em>a coach.</em>
            </Heading>
            <p className="section-description">
              Ask about classes, camps, partnerships or tournaments. WhatsApp
              gets you the fastest reply.
            </p>
            <Button asChild variant="green" className="mt-6 gap-3 rounded-full">
              <a
                href={whatsappUrl(
                  "Hello Dayal Sports Academy, I would like to ask about classes, camps or partnerships.",
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </Button>
            <div className="contact-info-list">
              <div className="contact-info-row">
                <div className="icon-tile">
                  <MapPin size={21} />
                </div>
                <div>
                  <h4>Visit us</h4>
                  <p>
                    Unit B, 2nd Floor, Season Mansion Building
                    <br />
                    No. 40-48 Tung On Street, Yau Ma Tei,
                    <br />
                    Kowloon, Hong Kong
                  </p>
                </div>
              </div>
              <div className="contact-info-row">
                <div className="icon-tile">
                  <Phone size={21} />
                </div>
                <div>
                  <h4>Let's talk</h4>
                  <a href="tel:+85228111502">Tel: (852) 2811 1502</a>
                  <br />
                  <a href="tel:+85266285295">Mobile: (852) 6628 5295</a>
                </div>
              </div>
              <div className="contact-info-row">
                <div className="icon-tile">
                  <Mail size={21} />
                </div>
                <div>
                  <h4>Write to us</h4>
                  <a href="mailto:dayalsportsacademy@gmail.com">
                    dayalsportsacademy@gmail.com
                  </a>
                  <p>
                    www.dayalssports.com
                    <br />
                    www.yuvaayoga.com
                    <br />
                    www.dayalsportsacademy.com
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal className="glass-panel p-6 sm:p-9" delay={0.1}>
            <span className="pill pill--green">Your next step</span>
            <h3 className="mt-5 text-[26px] font-semibold tracking-tight">
              Send an enquiry.
            </h3>
            <p className="mt-2 text-sm font-medium leading-relaxed text-muted-foreground">
              Tell us a little about you. We'll help you find your pathway.
            </p>
            <form key={search} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor={formId + "-first"}>First name</label>
                  <Input
                    id={formId + "-first"}
                    name="firstName"
                    autoComplete="given-name"
                    required
                    className="h-12 text-sm"
                    placeholder="Your first name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor={formId + "-last"}>Last name</label>
                  <Input
                    id={formId + "-last"}
                    name="lastName"
                    autoComplete="family-name"
                    required
                    className="h-12 text-sm"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor={formId + "-email"}>Email address</label>
                <Input
                  id={formId + "-email"}
                  name="email"
                  autoComplete="email"
                  type="email"
                  required
                  className="h-12 text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor={formId + "-phone"}>WhatsApp number</label>
                <Input
                  id={formId + "-phone"}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  minLength={7}
                  maxLength={30}
                  className="h-12 text-sm"
                  placeholder="+852 1234 5678"
                  title="Enter a phone number with country code, using 7 to 30 characters."
                />
              </div>
              <div className="space-y-2">
                <label htmlFor={formId + "-interest"}>I am interested in</label>
                <select
                  id={formId + "-interest"}
                  name="interest"
                  required
                  defaultValue={initialInterest}
                  className="contact-select"
                >
                  <option value="" disabled>
                    Select an interest
                  </option>
                  {enquiryInterests.map((interest) => (
                    <option key={interest} value={interest}>
                      {interest}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor={formId + "-message"}>Message</label>
                <Textarea
                  id={formId + "-message"}
                  name="message"
                  defaultValue={
                    requestedRole
                      ? "I would like to apply for the " +
                        requestedRole +
                        " role.\n\n"
                      : ""
                  }
                  required
                  className="min-h-[125px] resize-y text-sm"
                  placeholder="Tell us about your training goals, academy, or partnership..."
                />
              </div>
              <Button
                type="submit"
                variant="green"
                className="h-12 w-full gap-3 rounded-full text-xs"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <NeonShuttlecockLoader />
                    Sending your enquiry...
                  </>
                ) : (
                  <>
                    Send Enquiry
                    <Send size={15} />
                  </>
                )}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
