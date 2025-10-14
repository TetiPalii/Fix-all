import nodemailer from "nodemailer";

export const sendEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: Number(process.env.MAILTRAP_PORT),
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const verificationLink = `http://localhost:4000/auth/verify?token=${token}`;

  await transporter.sendMail({
    from: '"Marketplace 👷" <no-reply@marketplace.com>',
    to: email,
    subject: "✅ Potwierdzenie rejestracji",
    text: `Kliknij w link, aby potwierdzić swój adres e-mail: ${verificationLink}`,
    html: `<p>Kliknij w link, aby potwierdzić swój adres e-mail:</p><a href="${verificationLink}">${verificationLink}</a>`,
  });
};
