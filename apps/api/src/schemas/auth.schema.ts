import zod from "zod";
export const RegisterSchema = zod.object({
  email: zod.string().email(),
  password: zod
    .string()
    .min(8, "Min 8 znaków")
    .regex(/[A-Z]/, "Przynajmniej jedna wielka litera")
    .regex(/[0-9]/, "Przynajmniej jedna cyfra")
    .regex(/[^A-Za-z0-9]/, "Przynajmniej jeden znak specjalny"),
  name: zod.string().min(2, "Min 2 znaki"),
  role: zod.enum(["provider", "customer"]),
  location: zod.string().min(2, "Min 2 znaki"),
});

export type RegisterData = zod.infer<typeof RegisterSchema>;
