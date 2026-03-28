import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || '';
const fallbackApiBaseUrl = 'https://dhayal-sports-acadamy-x-api.onrender.com';
const localApiBaseUrl = 'http://127.0.0.1:3001';

const apiBaseCandidates = Array.from(
  new Set(
    [
      configuredApiBaseUrl,
      import.meta.env.DEV ? localApiBaseUrl : '',
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
        <filter id="shuttle-glow" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor="#EFFFFF" floodOpacity="0.7" />
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00F0FF" floodOpacity="0.85" />
        </filter>
      </defs>
      <g filter="url(#shuttle-glow)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 37L16 12" stroke="#F7FFFF" strokeWidth="2.5" />
        <path d="M32 37L23 10" stroke="#F7FFFF" strokeWidth="2.5" />
        <path d="M32 37L32 8" stroke="#F7FFFF" strokeWidth="2.5" />
        <path d="M32 37L41 10" stroke="#F7FFFF" strokeWidth="2.5" />
        <path d="M32 37L48 12" stroke="#F7FFFF" strokeWidth="2.5" />
        <path d="M32 37L12 19" stroke="#F7FFFF" strokeWidth="2.1" />
        <path d="M32 37L52 19" stroke="#F7FFFF" strokeWidth="2.1" />
        <path d="M20 27L27 16" stroke="#B9FEFF" strokeWidth="1.5" />
        <path d="M27 33L32 16" stroke="#B9FEFF" strokeWidth="1.5" />
        <path d="M37 33L32 16" stroke="#B9FEFF" strokeWidth="1.5" />
        <path d="M44 27L37 16" stroke="#B9FEFF" strokeWidth="1.5" />
        <path d="M24 39H40" stroke="#00F0FF" strokeWidth="3" />
        <path d="M26 39H38V48C38 50.2091 36.2091 52 34 52H30C27.7909 52 26 50.2091 26 48V39Z" stroke="#00F0FF" strokeWidth="2.8" />
      </g>
    </svg>
  );
}

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

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

          const data = (await response.json().catch(() => null)) as
            | { message?: string }
            | null;

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

      toast({
        title: "Enquiry Failed",
        description,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4">
              Contact <span className="text-primary">Dayal Sports Academy</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base mb-8">
              Reach the academy team for coaching enquiries, training partnerships, camps, and player development discussions.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 glass-panel rounded-2xl">
                <div className="p-3 bg-primary/20 rounded-xl text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Location</h4>
                  <p className="text-white/60">Unit B, 2nd Floor, Season Mansion Building<br/>No. 40-48 Tung On Street, Yau Ma Tei, Kowloon, Hong Kong</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 glass-panel rounded-2xl">
                <div className="p-3 bg-secondary/20 rounded-xl text-secondary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Phone</h4>
                  <p className="text-white/60">Tel: +852 2811 1502<br/>Mobile: +852 6628 5295</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 glass-panel rounded-2xl">
                <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Email</h4>
                  <p className="text-white/60">dayalsportsacademy@gmail.com<br/>www.dayalssportsacademy.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel p-6 sm:p-8 md:p-10 rounded-3xl border-primary/20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl pointer-events-none" />
            
            <h3 className="text-[2rem] sm:text-2xl font-bold mb-7 relative z-10">Send an Enquiry</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-medium text-white/80">First Name</label>
                  <Input
                    name="firstName"
                    required
                    className="h-11 sm:h-12 rounded-lg bg-background/50 border-white/10 px-4 py-2 text-sm sm:text-base leading-normal focus-visible:border-primary text-white placeholder:text-[12px] sm:placeholder:text-sm"
                    placeholder="Your first name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm sm:text-base font-medium text-white/80">Last Name</label>
                  <Input
                    name="lastName"
                    required
                    className="h-11 sm:h-12 rounded-lg bg-background/50 border-white/10 px-4 py-2 text-sm sm:text-base leading-normal focus-visible:border-primary text-white placeholder:text-[12px] sm:placeholder:text-sm"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm sm:text-base font-medium text-white/80">Email Address</label>
                <Input
                  name="email"
                  required
                  type="email"
                  className="h-11 sm:h-12 rounded-lg bg-background/50 border-white/10 px-4 py-2 text-sm sm:text-base leading-normal focus-visible:border-primary text-white placeholder:text-[12px] sm:placeholder:text-sm"
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm sm:text-base font-medium text-white/80">Message</label>
                <Textarea
                  name="message"
                  required
                  className="min-h-[140px] rounded-lg bg-background/50 border-white/10 px-4 py-3 text-sm sm:text-base leading-relaxed focus-visible:border-primary text-white placeholder:text-[12px] sm:placeholder:text-sm"
                  placeholder="Tell us about your academy, facility, or partnership requirement."
                />
              </div>

              <Button
                type="submit"
                variant="default"
                className="w-full h-12 sm:h-13 text-base sm:text-lg rounded-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <NeonShuttlecockLoader />
                    <span>Sending Enquiry...</span>
                  </span>
                ) : (
                  <>Send Inquiry <Send className="w-4 h-4 ml-2" /></>
                )}
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
