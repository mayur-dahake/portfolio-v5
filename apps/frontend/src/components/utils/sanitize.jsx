/**
 * Input sanitization & validation utilities
 * Strips dangerous content and validates field values before save/submit.
 */

// Strip HTML tags and script-injection patterns
export function sanitizeText(value) {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // strip control chars
    .trim();
}

// Allow newlines but strip malicious patterns (for bio/message)
export function sanitizeMultiline(value) {
  if (typeof value !== "string") return "";
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // strip control chars
    .trim();
}

// Only allow http/https URLs
export function sanitizeUrl(value) {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    const url = new URL(trimmed);
    if (!["http:", "https:"].includes(url.protocol)) return "";
    return trimmed;
  } catch {
    return "";
  }
}

// RFC-5322-inspired email regex — stricter than the old one
export function isValidEmail(value) {
  const trimmed = value?.trim() || "";
  // Must have local@domain.tld, no consecutive dots, reasonable length
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  if (!regex.test(trimmed)) return false;
  if (trimmed.length > 254) return false; // RFC 5321 max
  if (/\.\./.test(trimmed)) return false; // no consecutive dots
  return true;
}

export function isValidText(value, maxLength = 500) {
  const v = sanitizeText(value);
  return v.length > 0 && v.length <= maxLength;
}

// Detect obvious spam patterns in message body
export function containsSpam(value) {
  if (typeof value !== "string") return false;
  const spamPatterns = [
    /\bviagra\b/i,
    /\bcasino\b/i,
    /\bclick here\b/i,
    /\bfree money\b/i,
    /\bmake money fast\b/i,
    /\blottery\b/i,
    /\bunclaimed prize\b/i,
    /https?:\/\//gi // URLs in messages are a common spam signal
  ];
  // Flag if 2+ URL instances or any hard spam word matches
  const urlMatches = (value.match(/https?:\/\//gi) || []).length;
  if (urlMatches >= 2) return true;
  return spamPatterns.slice(0, -1).some((p) => p.test(value));
}

// Sanitize a whole data object based on a field-type map
export function sanitizeFormData(data, fieldMap) {
  const result = { ...data };
  for (const [key, type] of Object.entries(fieldMap)) {
    if (result[key] === undefined || result[key] === null) continue;
    if (type === "text") result[key] = sanitizeText(result[key]);
    if (type === "multiline") result[key] = sanitizeMultiline(result[key]);
    if (type === "url") result[key] = sanitizeUrl(result[key]);
    if (type === "email") result[key] = sanitizeText(result[key]).toLowerCase();
    if (type === "number") result[key] = Number(result[key]) || 0;
    if (type === "array")
      result[key] = (result[key] || [])
        .map((v) => sanitizeText(v))
        .filter(Boolean);
  }
  return result;
}

// Validate contact form — returns object { field -> error string }
export function validateContactForm({ name, email, message }) {
  const errors = {};

  const cleanName = sanitizeText(name);
  if (!cleanName) errors.name = "Name is required.";
  else if (cleanName.length < 2)
    errors.name = "Name must be at least 2 characters.";
  else if (cleanName.length > 100)
    errors.name = "Name must be 100 characters or fewer.";

  const cleanEmail = sanitizeText(email).toLowerCase();
  if (!cleanEmail) errors.email = "Email is required.";
  else if (!isValidEmail(cleanEmail))
    errors.email = "Please enter a valid email address (e.g. you@example.com).";

  const cleanMessage = sanitizeMultiline(message);
  if (!cleanMessage) errors.message = "Message is required.";
  else if (cleanMessage.length < 10)
    errors.message = "Message must be at least 10 characters.";
  else if (cleanMessage.length > 2000)
    errors.message = `Message is too long (${cleanMessage.length}/2000 characters).`;
  else if (containsSpam(cleanMessage))
    errors.message = "Message contains disallowed content.";

  return errors;
}
