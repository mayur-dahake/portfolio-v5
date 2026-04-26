import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  ArrowUpRight,
  Copy,
  Send,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import {
  sanitizeText,
  sanitizeMultiline,
  validateContactForm
} from "@/components/utils/sanitize";

// Client-side rate limit: max 3 submissions per 10 minutes
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const submissionLog = [];

function isRateLimited() {
  const now = Date.now();
  // Purge old entries
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
  // honeypot — must stay empty; hidden from real users
  const [honeypot, setHoneypot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  // track when the form was first rendered to detect instant (bot) submissions
  const formLoadTime = useState(() => Date.now())[0];

  const socialLinks = [
    { icon: Github, url: profile?.github, label: "GitHub" },
    { icon: Linkedin, url: profile?.linkedin, label: "LinkedIn" },
    { icon: XIcon, url: profile?.twitterUrl, label: "X (Twitter)" }
  ].filter((link) => link.url);

  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    if (profile?.email) {
      navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Per-field live validation on blur
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

    // ── Bot guards ──────────────────────────────────────────────
    // 1. Honeypot must be empty
    if (honeypot) return;

    // 2. Submission must take at least 2 seconds (bots fill forms instantly)
    if (Date.now() - formLoadTime < 2000) return;

    // 3. Client-side rate limit
    if (isRateLimited()) {
      setSubmitStatus("rate_limited");
      return;
    }

    // ── Sanitize ────────────────────────────────────────────────
    const clean = {
      name: sanitizeText(formData.name),
      email: sanitizeText(formData.email).toLowerCase(),
      message: sanitizeMultiline(formData.message)
    };

    // ── Validate ────────────────────────────────────────────────
    const errors = validateContactForm(clean);
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    setIsSubmitting(true);
    recordSubmission();
    try {
      const subject = encodeURIComponent(
        `Portfolio Contact: Message from ${clean.name}`
      );
      const body = encodeURIComponent(
        `Name: ${clean.name}\nEmail: ${clean.email}\n\nMessage:\n${clean.message}\n\n---\nSent from portfolio contact form`
      );
      window.location.href = `mailto:mayurdahake13@gmail.com?subject=${subject}&body=${body}`;
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={`min-h-screen flex items-center py-16 md:py-32 px-4 md:px-12 lg:px-24 relative overflow-hidden ${darkMode ? "bg-[#111]" : "bg-[#f5f5f0]"}`}
    >
      {/* Large decorative element */}
      <div
        className={`absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[60vw] h-[60vw] rounded-full border pointer-events-none ${darkMode ? "border-white/5" : "border-black/5"}`}
      />
      <div
        className={`absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[40vw] h-[40vw] rounded-full border pointer-events-none ${darkMode ? "border-white/5" : "border-black/5"}`}
      />

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Section marker */}
        <motion.div
          className="flex items-center gap-4 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span
            className={`text-xs font-mono tracking-widest ${darkMode ? "text-white/40" : "text-black/40"}`}
          >
            005
          </span>
          <div
            className={`w-16 h-px ${darkMode ? "bg-white/20" : "bg-black/20"}`}
          />
          <span
            className={`text-xs font-mono tracking-widest ${darkMode ? "text-white/40" : "text-black/40"}`}
          >
            CONTACT
          </span>
        </motion.div>

        {/* Main CTA */}
        <div className="mb-20">
          <motion.h2
            className={`text-3xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8 ${darkMode ? "text-white" : "text-black"}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            LET'S CREATE
            <br />
            <span
              className={`text-transparent ${darkMode ? "[-webkit-text-stroke:2px_white]" : "[-webkit-text-stroke:2px_black]"}`}
            >
              SOMETHING
            </span>
            <br />
            <span className="text-[#ff0080]">TOGETHER</span>
          </motion.h2>

          <motion.p
            className={`text-xl max-w-md ${darkMode ? "text-white/50" : "text-black/50"}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Have a project in mind? I'd love to hear about it. Drop me a line
            and let's make it happen.
          </motion.p>
        </div>

        {/* Email - large clickable */}
        {profile?.email && (
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p
              className={`text-xs font-mono tracking-widest mb-4 ${darkMode ? "text-white/40" : "text-black/40"}`}
            >
              SAY HELLO
            </p>
            <a
              href={`mailto:${profile.email}`}
              className={`group inline-flex items-center gap-2 md:gap-4 text-base md:text-4xl font-bold hover:text-[#ff0080] transition-colors break-all ${darkMode ? "text-white" : "text-black"}`}
            >
              {profile.email}
              <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all" />
            </a>
            <button
              onClick={copyEmail}
              className={`ml-4 p-2 transition-colors relative ${darkMode ? "text-white/30 hover:text-white" : "text-black/30 hover:text-black"}`}
              title="Copy email"
            >
              <Copy className="w-5 h-5" />
              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#ff0080] text-white text-xs font-mono whitespace-nowrap rounded">
                  COPIED!
                </span>
              )}
            </button>
          </motion.div>
        )}

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <p
            className={`text-xs font-mono tracking-widest mb-6 ${darkMode ? "text-white/40" : "text-black/40"}`}
          >
            SEND A MESSAGE
          </p>

          {submitStatus === "success" && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-green-400 text-sm">
                Message sent! I'll get back to you soon.
              </p>
            </div>
          )}
          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-400 text-sm">
                Something went wrong. Please try again.
              </p>
            </div>
          )}
          {submitStatus === "rate_limited" && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
              <p className="text-yellow-400 text-sm">
                Too many submissions. Please wait a few minutes before trying
                again.
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4 max-w-2xl"
          >
            {/* Honeypot — visually hidden, bots fill it, humans don't */}
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
            <div className="flex flex-col gap-1">
              <label
                htmlFor="contact-name"
                className={`text-[10px] font-mono tracking-widest ${darkMode ? "text-white/30" : "text-black/30"}`}
              >
                NAME *
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                maxLength={100}
                autoComplete="name"
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                onBlur={() => handleBlur("name")}
                className={`px-4 py-3 text-sm font-mono border bg-transparent outline-none focus:border-[#ff0080] transition-colors ${
                  fieldErrors.name
                    ? "border-red-500"
                    : darkMode
                      ? "border-white/20 text-white placeholder:text-white/30"
                      : "border-black/20 text-black placeholder:text-black/30"
                }`}
              />
              {fieldErrors.name && (
                <p className="text-red-400 text-xs font-mono flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />{" "}
                  {fieldErrors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="contact-email"
                className={`text-[10px] font-mono tracking-widest ${darkMode ? "text-white/30" : "text-black/30"}`}
              >
                EMAIL *
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                maxLength={254}
                autoComplete="email"
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                onBlur={() => handleBlur("email")}
                className={`px-4 py-3 text-sm font-mono border bg-transparent outline-none focus:border-[#ff0080] transition-colors ${
                  fieldErrors.email
                    ? "border-red-500"
                    : darkMode
                      ? "border-white/20 text-white placeholder:text-white/30"
                      : "border-black/20 text-black placeholder:text-black/30"
                }`}
              />
              {fieldErrors.email && (
                <p className="text-red-400 text-xs font-mono flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 flex-shrink-0" />{" "}
                  {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="md:col-span-2 flex flex-col gap-1">
              <label
                htmlFor="contact-message"
                className={`text-[10px] font-mono tracking-widest ${darkMode ? "text-white/30" : "text-black/30"}`}
              >
                MESSAGE *
              </label>
              <textarea
                id="contact-message"
                placeholder="Tell me about your project..."
                rows={4}
                maxLength={2000}
                value={formData.message}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, message: e.target.value }))
                }
                onBlur={() => handleBlur("message")}
                className={`px-4 py-3 text-sm font-mono border bg-transparent outline-none focus:border-[#ff0080] transition-colors resize-none ${
                  fieldErrors.message
                    ? "border-red-500"
                    : darkMode
                      ? "border-white/20 text-white placeholder:text-white/30"
                      : "border-black/20 text-black placeholder:text-black/30"
                }`}
              />
              <div className="flex items-center justify-between">
                {fieldErrors.message ? (
                  <p className="text-red-400 text-xs font-mono flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />{" "}
                    {fieldErrors.message}
                  </p>
                ) : (
                  <span />
                )}
                <span
                  className={`text-xs font-mono ml-auto ${formData.message.length > 1800 ? "text-yellow-400" : darkMode ? "text-white/20" : "text-black/30"}`}
                >
                  {formData.message.length}/2000
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-2 flex items-center justify-center gap-2 px-8 py-4 bg-[#ff0080] text-white font-mono text-sm tracking-widest hover:bg-[#ff0080]/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                "SENDING..."
              ) : (
                <>
                  <Send className="w-4 h-4" /> SEND MESSAGE
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Social links */}
        {socialLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p
              className={`text-xs font-mono tracking-widest mb-6 ${darkMode ? "text-white/40" : "text-black/40"}`}
            >
              ELSEWHERE
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group w-10 h-10 flex items-center justify-center border hover:border-[#ff0080] hover:bg-[#ff0080] hover:text-white transition-all duration-300 ${darkMode ? "border-white/20 text-white" : "border-black/20 text-black"}`}
                  title={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
