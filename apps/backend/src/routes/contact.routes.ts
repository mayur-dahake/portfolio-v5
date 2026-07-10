import { Router } from "express";
import rateLimit from "express-rate-limit";
import { contactController } from "../modules/contact/contact.controller";
import { contactSchema } from "../modules/contact/contact.validation";
import { validate } from "../common/middleware/validate";

export const contactRouter = Router();

// Strict rate limiter for contact form to prevent spam
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message: {
    message:
      "Too many contact requests from this IP, please try again after 15 minutes."
  }
});

contactRouter.post(
  "/",
  contactLimiter,
  validate(contactSchema),
  contactController.sendEmail
);
