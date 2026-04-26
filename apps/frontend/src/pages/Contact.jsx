import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, MessageSquare, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // No backend email service — open the default mail client with pre-filled content
      const subject = encodeURIComponent(`Portfolio Contact: Message from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:mayurdahake13@gmail.com?subject=${subject}&body=${body}`;

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#ff0080]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#ff0080]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-4 md:px-12 lg:px-24 py-12">
        {/* Back link */}
        <Link 
          to={createPageUrl('Home')}
          className="inline-flex items-center gap-2 text-white/50 hover:text-[#ff0080] transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-mono">BACK TO HOME</span>
        </Link>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-mono text-white/40 tracking-widest">001</span>
              <div className="w-16 h-px bg-white/20" />
              <span className="text-xs font-mono text-white/40 tracking-widest">CONTACT</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              GET IN <span className="text-[#ff0080]">TOUCH</span>
            </h1>
            <p className="text-white/50 text-lg">
              Have a project in mind or just want to say hello? Drop me a message!
            </p>
          </motion.div>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-4"
            >
              <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-green-400 mb-1">Message Sent Successfully!</h3>
                <p className="text-green-300/70 text-sm">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-4"
            >
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-400 mb-1">Failed to Send Message</h3>
                <p className="text-red-300/70 text-sm">
                  Something went wrong. Please try again or email me directly at mayurdahake13@gmail.com
                </p>
              </div>
            </motion.div>
          )}

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/70 font-mono text-xs tracking-wider flex items-center gap-2">
                <User className="w-4 h-4" />
                YOUR NAME
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#ff0080] focus:ring-[#ff0080]/20 h-12"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/70 font-mono text-xs tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4" />
                YOUR EMAIL
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#ff0080] focus:ring-[#ff0080]/20 h-12"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-white/70 font-mono text-xs tracking-wider flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                YOUR MESSAGE
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or just say hi..."
                rows={6}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#ff0080] focus:ring-[#ff0080]/20 resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-[#ff0080] hover:bg-[#ff0080]/90 text-white font-bold text-lg group"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  SENDING...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  SEND MESSAGE
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </motion.form>

          {/* Alternative contact */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-white/40 text-sm mt-8"
          >
            Or email me directly at{' '}
            <a href="mailto:mayurdahake13@gmail.com" className="text-[#ff0080] hover:underline">
              mayurdahake13@gmail.com
            </a>
          </motion.p>
        </div>
      </div>
    </div>
  );
}
