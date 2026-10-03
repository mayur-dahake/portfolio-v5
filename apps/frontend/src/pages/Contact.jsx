import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mail,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Copy,
  Check,
  Sun,
  Moon,
  Phone,
  MapPin,
  ExternalLink
} from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createPageUrl } from "@/utils";
import { api } from "@/api/apiClient";
import { fallbackProfile } from "@/lib/fallbackData";
import { LogoMark } from "@/components/portfolio/Logo";
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

export default function Contact() {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Dynamic Profile query
  const { data: apiProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.get("/api/profile").catch(() => null),
    staleTime: 5 * 60 * 1000
  });

  const profile = apiProfile || fallbackProfile;

  // SEO
  useEffect(() => {
    const name = profile?.fullName || "Mayur Dahake";
    const headline = profile?.headline || "Full-Stack Software Engineer";
    document.title = `Contact — ${name} | ${headline}`;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        `Get in touch with ${name}, ${headline}. Open for engineering opportunities, technical consulting, and enterprise web solutions.`
      );
    }
  }, [profile]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | 'rate_limited' | null
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    if (profile?.email) {
      navigator.clipboard.writeText(profile.email).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
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

    // Bot honeypot protection
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
    if (Object.keys(errors).length > 0) {
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
    } catch (error) {
      console.error("Failed to send message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      icon: SiGithub,
      url: profile?.github,
      label: "GitHub",
      handle: "github.com/mayurdahake"
    },
    {
      icon: FaLinkedinIn,
      url: profile?.linkedin,
      label: "LinkedIn",
      handle: "linkedin.com/in/mayurdahake"
    },
    {
      icon: SiX,
      url: profile?.twitterUrl,
      label: "X / Twitter",
      handle: "@mayurdahake"
    }
  ].filter((link) => link.url);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-[#0a0a0a] text-white" : "bg-[#f8fafc] text-black"
      }`}
    >
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none ${
            darkMode ? "bg-[#ff0080]/10" : "bg-[#ff0080]/5"
          }`}
        />
        <div
          className={`absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-[140px] pointer-events-none ${
            darkMode ? "bg-[#ff0080]/5" : "bg-[#ff0080]/3"
          }`}
        />
      </div>

      {/* Top Header Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 h-16 flex items-center justify-between border-b backdrop-blur-md transition-colors ${
          darkMode
            ? "bg-[#0a0a0a]/85 border-white/10"
            : "bg-white/85 border-black/10"
        }`}
      >
        <Link
          to={createPageUrl("Home")}
          className={`flex items-center gap-2 transition-colors text-xs font-mono tracking-widest ${
            darkMode
              ? "text-white/60 hover:text-white"
              : "text-black/60 hover:text-black"
          }`}
          aria-label="Back to Portfolio home"
        >
          <ArrowLeft className="w-4 h-4 text-[#ff0080]" />
          BACK TO PORTFOLIO
        </Link>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label={
              darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
              darkMode
                ? "border-white/15 text-white/80 hover:text-white hover:border-white/30 bg-white/5"
                : "border-black/15 text-black/80 hover:text-black hover:border-black/30 bg-black/5"
            }`}
          >
            {darkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Option 1 Logo Mark */}
          <Link
            to={createPageUrl("Home")}
            aria-label={`${profile?.fullName || "Mayur Dahake"} Home`}
            className="hover:opacity-80 transition-opacity flex items-center"
          >
            <LogoMark className="w-7 h-7" darkMode={darkMode} />
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-28 pb-20">
        {/* Eyebrow & Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-[#ff0080] font-bold tracking-widest">
              005
            </span>
            <div
              className={`w-12 h-px ${
                darkMode ? "bg-white/20" : "bg-black/20"
              }`}
            />
            <span
              className={`text-xs font-mono tracking-widest uppercase ${
                darkMode ? "text-white/50" : "text-black/50"
              }`}
            >
              CONTACT & INQUIRIES
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4">
            GET IN <span className="text-[#ff0080]">TOUCH</span>
          </h1>

          <p
            className={`text-base md:text-lg max-w-2xl leading-relaxed ${
              darkMode ? "text-white/60" : "text-black/60"
            }`}
          >
            Have a project in mind, looking for a senior full-stack engineer, or
            want to discuss enterprise architecture? Drop a message below or
            reach out directly.
          </p>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Channels (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Availability Badge */}
            <div
              className={`p-5 rounded-none border ${
                darkMode
                  ? "bg-white/[0.03] border-white/10"
                  : "bg-white border-black/10 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-500">
                  Available for Opportunities
                </span>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  darkMode ? "text-white/50" : "text-black/60"
                }`}
              >
                Specialized in .NET Core APIs, Angular, SQL Server & cloud
                enterprise systems.
              </p>
            </div>

            {/* Email Card */}
            <div
              className={`p-5 rounded-none border ${
                darkMode
                  ? "bg-white/[0.03] border-white/10"
                  : "bg-white border-black/10 shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest ${
                    darkMode ? "text-white/40" : "text-black/40"
                  }`}
                >
                  Direct Email
                </span>
                <button
                  onClick={copyEmail}
                  type="button"
                  className={`flex items-center gap-1.5 text-xs font-mono text-[#ff0080] hover:opacity-80 transition-opacity`}
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href={`mailto:${profile?.email || "mayurdahake13@gmail.com"}`}
                className="text-base sm:text-lg font-bold hover:text-[#ff0080] transition-colors break-all"
              >
                {profile?.email || "mayurdahake13@gmail.com"}
              </a>
            </div>

            {/* Phone Card (if present) */}
            {profile?.phone && (
              <div
                className={`p-5 rounded-none border ${
                  darkMode
                    ? "bg-white/[0.03] border-white/10"
                    : "bg-white border-black/10 shadow-sm"
                }`}
              >
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest block mb-2 ${
                    darkMode ? "text-white/40" : "text-black/40"
                  }`}
                >
                  Phone / WhatsApp
                </span>
                <a
                  href={`tel:${profile.phone.replace(/[\s-]/g, "")}`}
                  className="text-base sm:text-lg font-bold hover:text-[#ff0080] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#ff0080]" />
                  {profile.phone}
                </a>
              </div>
            )}

            {/* Location Card */}
            <div
              className={`p-5 rounded-none border ${
                darkMode
                  ? "bg-white/[0.03] border-white/10"
                  : "bg-white border-black/10 shadow-sm"
              }`}
            >
              <span
                className={`text-[10px] font-mono uppercase tracking-widest block mb-2 ${
                  darkMode ? "text-white/40" : "text-black/40"
                }`}
              >
                Base Location
              </span>
              <p className="text-base font-bold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#ff0080]" />
                {profile?.location || "India"} · Remote / Worldwide
              </p>
            </div>

            {/* Social Network Links */}
            <div className="space-y-2 pt-2">
              <span
                className={`text-[10px] font-mono uppercase tracking-widest block mb-3 ${
                  darkMode ? "text-white/40" : "text-black/40"
                }`}
              >
                Online Profiles
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between p-3.5 border transition-all group ${
                        darkMode
                          ? "bg-white/[0.02] border-white/10 hover:border-[#ff0080]/50 hover:bg-white/[0.04]"
                          : "bg-white border-black/10 hover:border-[#ff0080]/50 hover:bg-black/[0.02]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-[#ff0080]" />
                        <span className="text-xs font-mono font-bold">
                          {item.label}
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#ff0080]" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div
              className={`p-6 sm:p-8 border ${
                darkMode
                  ? "bg-white/[0.02] border-white/10"
                  : "bg-white border-black/10 shadow-sm"
              }`}
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span>Send a Message</span>
                <span className="text-[#ff0080]">.</span>
              </h2>

              {/* Status Notifications */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-sm text-emerald-400 mb-0.5">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-xs text-emerald-300/80 leading-relaxed">
                        Thank you for reaching out. Your message has been
                        received, and I will reply to your email shortly.
                      </p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === "rate_limited" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-sm text-amber-400 mb-0.5">
                        Submission Limit Reached
                      </h3>
                      <p className="text-xs text-amber-300/80 leading-relaxed">
                        To prevent spam, submissions are limited. Please email
                        me directly at{" "}
                        <a
                          href={`mailto:${profile?.email || "mayurdahake13@gmail.com"}`}
                          className="underline font-bold"
                        >
                          {profile?.email || "mayurdahake13@gmail.com"}
                        </a>
                        .
                      </p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/30 flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-sm text-red-400 mb-0.5">
                        Failed to Send Message
                      </h3>
                      <p className="text-xs text-red-300/80 leading-relaxed">
                        Something went wrong during submission. Please try again
                        or email me directly at{" "}
                        <a
                          href={`mailto:${profile?.email || "mayurdahake13@gmail.com"}`}
                          className="underline font-bold text-white"
                        >
                          {profile?.email || "mayurdahake13@gmail.com"}
                        </a>
                        .
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Honeypot field (hidden from legitimate users) */}
                <input
                  type="text"
                  name="website_honeypot"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                {/* Name */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-name"
                    className={`font-mono text-xs tracking-wider flex items-center gap-1.5 ${
                      darkMode ? "text-white/70" : "text-black/70"
                    }`}
                  >
                    <User className="w-3.5 h-3.5 text-[#ff0080]" />
                    YOUR NAME
                  </Label>
                  <Input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
                    placeholder="Mayur Dahake"
                    className={`rounded-none h-11 transition-all ${
                      darkMode
                        ? "bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#ff0080] focus:ring-[#ff0080]/20"
                        : "bg-black/[0.02] border-black/15 text-black placeholder:text-black/30 focus:border-[#ff0080] focus:ring-[#ff0080]/20"
                    } ${fieldErrors.name ? "border-red-500" : ""}`}
                  />
                  {fieldErrors.name && (
                    <p className="text-red-400 text-xs font-mono mt-1">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-email"
                    className={`font-mono text-xs tracking-wider flex items-center gap-1.5 ${
                      darkMode ? "text-white/70" : "text-black/70"
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5 text-[#ff0080]" />
                    YOUR EMAIL
                  </Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    placeholder="name@example.com"
                    className={`rounded-none h-11 transition-all ${
                      darkMode
                        ? "bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#ff0080] focus:ring-[#ff0080]/20"
                        : "bg-black/[0.02] border-black/15 text-black placeholder:text-black/30 focus:border-[#ff0080] focus:ring-[#ff0080]/20"
                    } ${fieldErrors.email ? "border-red-500" : ""}`}
                  />
                  {fieldErrors.email && (
                    <p className="text-red-400 text-xs font-mono mt-1">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-message"
                    className={`font-mono text-xs tracking-wider flex items-center gap-1.5 ${
                      darkMode ? "text-white/70" : "text-black/70"
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#ff0080]" />
                    YOUR MESSAGE
                  </Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur("message")}
                    placeholder="Tell me about your project, timeline, or inquiries..."
                    rows={5}
                    className={`rounded-none transition-all resize-none ${
                      darkMode
                        ? "bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#ff0080] focus:ring-[#ff0080]/20"
                        : "bg-black/[0.02] border-black/15 text-black placeholder:text-black/30 focus:border-[#ff0080] focus:ring-[#ff0080]/20"
                    } ${fieldErrors.message ? "border-red-500" : ""}`}
                  />
                  {fieldErrors.message && (
                    <p className="text-red-400 text-xs font-mono mt-1">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-[#ff0080] hover:bg-[#e00072] text-white font-mono font-bold text-xs uppercase tracking-widest rounded-none transition-all group focus-visible:ring-2 focus-visible:ring-[#ff0080] focus-visible:outline-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      SENDING...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      SEND MESSAGE
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Page Footer */}
      <footer
        className={`py-8 px-6 md:px-12 border-t transition-colors ${
          darkMode
            ? "bg-[#0a0a0a] border-white/10 text-white/40"
            : "bg-[#f8fafc] border-black/10 text-black/50"
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoMark className="w-5 h-5 flex-shrink-0" darkMode={darkMode} />
            <p className="text-xs font-mono">
              © {new Date().getFullYear()} {profile?.fullName || "Mayur Dahake"}{" "}
              — All rights reserved
            </p>
          </div>
          <p className="text-xs font-mono">
            Designed & Engineered with .NET & React
          </p>
        </div>
      </footer>
    </div>
  );
}
