import { useState } from "react";
import PropTypes from "prop-types";
import { Copy, Send, CheckCircle, AlertCircle } from "lucide-react";
import { SiX, SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import {
  sanitizeText,
  sanitizeMultiline,
  validateContactForm
} from "@/components/utils/sanitize";
import { api } from "@/api/apiClient";

// Client-side rate limit: max 3 submissions per 10 minutes
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const submissionLog = [];

function isRateLimited() {
  const now = Date.now();
  while (
    submissionLog.length &&
    now - submissionLog[0] > RATE_LIMIT_WINDOW_MS
  ) {
    submissionLog.shift();
  }
  return submissionLog.length >= RATE_LIMIT_MAX;
}

function recordSubmission() {
  submissionLog.push(Date.now());
}

export default function ContactSection({ profile, darkMode }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  // honeypot — hidden from real users, filled only by automated scrapers
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [copied, setCopied] = useState(false);

  const socialLinks = [
    { icon: SiGithub, url: profile?.github, label: "GitHub" },
    { icon: FaLinkedinIn, url: profile?.linkedin, label: "LinkedIn" },
    { icon: SiX, url: profile?.twitterUrl, label: "X" }
  ].filter((link) => link.url);

  const copyEmail = () => {
    if (profile?.email) {
      navigator.clipboard.writeText(profile.email).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBlur = (field) => {
    const errors = validateContactForm({
      name: formData.name,
      email: formData.email,
      message: formData.message
    });
    setFieldErrors((prev) => ({
      ...prev,
      [field]: errors[field] || null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    // Honeypot check (real users will not fill this)
    if (honeypot) return;

    if (isRateLimited()) {
      setSubmitStatus("rate_limited");
      return;
    }

    const clean = {
      name: sanitizeText(formData.name),
      email: sanitizeText(formData.email).toLowerCase(),
      message: sanitizeMultiline(formData.message)
    };

    const errors = validateContactForm(clean);
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    recordSubmission();

    try {
      await api.post("/api/contact", clean);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Failed to send message:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={`py-20 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden ${
        darkMode ? "bg-[#0d0d0d]" : "bg-[#f8fafc]"
      }`}
    >
      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Section marker */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs font-mono tracking-widest text-[#ff0080]">
            005
          </span>
          <div
            className={`w-12 h-px ${darkMode ? "bg-white/20" : "bg-black/20"}`}
          />
          <h2
            className={`text-xs font-mono tracking-widest uppercase font-bold ${
              darkMode ? "text-white/60" : "text-black/60"
            }`}
          >
            Contact
          </h2>
        </div>

        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <h3
            className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            Get In <span className="text-[#ff0080]">Touch</span>
          </h3>
          <p
            className={`text-base md:text-lg leading-relaxed ${
              darkMode ? "text-white/70" : "text-black/70"
            }`}
          >
            Interested in discussing full-stack engineering opportunities,
            enterprise .NET architecture, or software delivery? Send a message
            or reach out directly.
          </p>
        </div>

        {/* Direct Email Bar */}
        {profile?.email && (
          <div className="mb-14">
            <p
              className={`text-xs font-mono tracking-widest uppercase mb-3 ${
                darkMode ? "text-white/40" : "text-black/50"
              }`}
            >
              Direct Email
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className={`text-xl sm:text-2xl md:text-3xl font-mono font-bold hover:text-[#ff0080] transition-colors break-all ${
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {profile.email}
              </a>
              <button
                onClick={copyEmail}
                className={`p-2.5 border transition-all relative focus-visible:ring-2 focus-visible:ring-[#ff0080] focus-visible:outline-none ${
                  darkMode
                    ? "border-white/20 text-white/70 hover:border-[#ff0080] hover:text-[#ff0080]"
                    : "border-black/20 text-black/70 hover:border-[#ff0080] hover:text-[#ff0080]"
                }`}
                title="Copy email address"
                aria-label="Copy email address"
              >
                <Copy className="w-4 h-4" />
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#ff0080] text-white text-[10px] font-mono whitespace-nowrap">
                    COPIED!
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Contact Form */}
        <div className="max-w-2xl">
          <p
            className={`text-xs font-mono tracking-widest uppercase mb-6 ${
              darkMode ? "text-white/40" : "text-black/50"
            }`}
          >
            Send a Message
          </p>

          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-500 text-sm font-semibold">
                  Message sent successfully!
                </p>
                <p
                  className={`text-xs mt-1 font-mono ${
                    darkMode ? "text-white/60" : "text-black/60"
                  }`}
                >
                  Thank you for reaching out. I will get back to you shortly.
                </p>
              </div>
            </div>
          )}

          {submitStatus === "rate_limited" && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
              <p className="text-yellow-400 text-sm font-mono">
                Too many attempts. Please wait a few moments before trying
                again.
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 text-sm font-semibold">
                  Failed to send message
                </p>
                <p
                  className={`text-xs mt-1 font-mono ${
                    darkMode ? "text-white/60" : "text-black/60"
                  }`}
                >
                  Something went wrong. Please email me directly at{" "}
                  <a
                    href={`mailto:${profile?.email || "mayurdahake13@gmail.com"}`}
                    className="underline text-[#ff0080]"
                  >
                    {profile?.email || "mayurdahake13@gmail.com"}
                  </a>
                  .
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            {/* Honeypot for automated spam bots */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-9999px",
                width: "1px",
                height: "1px",
                opacity: 0
              }}
            />

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-name"
                className={`text-[10px] font-mono tracking-widest uppercase ${
                  darkMode ? "text-white/40" : "text-black/50"
                }`}
              >
                Name *
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                maxLength={100}
                required
                autoComplete="name"
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                onBlur={() => handleBlur("name")}
                className={`px-4 py-3 text-sm font-mono border bg-transparent outline-none transition-colors ${
                  darkMode
                    ? "text-white placeholder:text-white/30 border-white/20 focus:border-[#ff0080]"
                    : "text-black placeholder:text-black/30 border-black/20 focus:border-[#ff0080]"
                } ${fieldErrors.name ? "border-red-500" : ""}`}
              />
              {fieldErrors.name && (
                <p className="text-red-400 text-xs font-mono">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-email"
                className={`text-[10px] font-mono tracking-widest uppercase ${
                  darkMode ? "text-white/40" : "text-black/50"
                }`}
              >
                Email *
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                maxLength={254}
                required
                autoComplete="email"
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                onBlur={() => handleBlur("email")}
                className={`px-4 py-3 text-sm font-mono border bg-transparent outline-none transition-colors ${
                  darkMode
                    ? "text-white placeholder:text-white/30 border-white/20 focus:border-[#ff0080]"
                    : "text-black placeholder:text-black/30 border-black/20 focus:border-[#ff0080]"
                } ${fieldErrors.email ? "border-red-500" : ""}`}
              />
              {fieldErrors.email && (
                <p className="text-red-400 text-xs font-mono">
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="md:col-span-2 flex flex-col gap-1.5">
              <label
                htmlFor="contact-message"
                className={`text-[10px] font-mono tracking-widest uppercase ${
                  darkMode ? "text-white/40" : "text-black/50"
                }`}
              >
                Message *
              </label>
              <textarea
                id="contact-message"
                placeholder="Your project, opportunity, or message..."
                rows={5}
                maxLength={2000}
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, message: e.target.value }))
                }
                onBlur={() => handleBlur("message")}
                className={`px-4 py-3 text-sm font-mono border bg-transparent outline-none transition-colors resize-none ${
                  darkMode
                    ? "text-white placeholder:text-white/30 border-white/20 focus:border-[#ff0080]"
                    : "text-black placeholder:text-black/30 border-black/20 focus:border-[#ff0080]"
                } ${fieldErrors.message ? "border-red-500" : ""}`}
              />
              <div className="flex items-center justify-between mt-1">
                {fieldErrors.message ? (
                  <p className="text-red-400 text-xs font-mono">
                    {fieldErrors.message}
                  </p>
                ) : (
                  <span />
                )}
                <span
                  className={`text-xs font-mono ml-auto ${
                    darkMode ? "text-white/30" : "text-black/40"
                  }`}
                >
                  {formData.message.length}/2000
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-2 flex items-center justify-center gap-2 px-8 py-4 bg-[#ff0080] text-white font-mono text-xs tracking-widest font-bold hover:bg-[#ff0080]/90 transition-all disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#ff0080] focus-visible:outline-none"
            >
              {isSubmitting ? (
                "SENDING MESSAGE..."
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> SEND MESSAGE
                </>
              )}
            </button>
          </form>
        </div>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div
            className={`mt-14 pt-8 border-t ${
              darkMode ? "border-white/10" : "border-black/10"
            }`}
          >
            <p
              className={`text-xs font-mono tracking-widest uppercase mb-4 ${
                darkMode ? "text-white/40" : "text-black/50"
              }`}
            >
              Profiles
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center border transition-all focus-visible:ring-2 focus-visible:ring-[#ff0080] focus-visible:outline-none ${
                    darkMode
                      ? "border-white/20 text-white/60 hover:border-[#ff0080] hover:text-[#ff0080]"
                      : "border-black/20 text-black/60 hover:border-[#ff0080] hover:text-[#ff0080]"
                  }`}
                  title={link.label}
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

ContactSection.propTypes = {
  darkMode: PropTypes.bool,
  profile: PropTypes.shape({
    github: PropTypes.string,
    linkedin: PropTypes.string,
    twitterUrl: PropTypes.string,
    email: PropTypes.string
  })
};
