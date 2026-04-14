import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.email("Valid email is required"),
  address: z.string().trim().min(3, "Address is required"),
  phone: z.string().trim().min(8, "Phone is required"),
  description: z.string().trim().min(10, "Description is required"),
  website: z.string().optional().default(""),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;
