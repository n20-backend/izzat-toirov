import { z } from 'zod';

export const validateUser = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password_hash: z.string().min(6).max(100),
});


export const employeeSchema = z.object({
  first_name: z
    .string()
    .min(3, "First name is required")
    .max(100, "First name is too long"),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name is too long"),
  email: z
    .string()
    .email("Invalid email format")
    .max(150, "Email is too long"),
  phone: z
    .string()
    .max(20, "Phone number is too long")
    .or(z.literal("")),
  position: z
    .string()
    .max(100, "Position is too long")
    .or(z.literal("")),
  salary: z
    .number()
    .nonnegative({ message: "Salary must be a non-negative number" }),
});

