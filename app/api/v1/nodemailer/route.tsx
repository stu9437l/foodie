import { errorHandler } from '@/backend/errorHandler';
import prisma from '@/prisma/db';
import { encryption } from '@/utils/lib/crypto-js';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export async function POST(request: Request) {
  try {
    const employees = await prisma.employee.findMany();

    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_SMTP_HOST,
      port: Number(process.env.NEXT_PUBLIC_SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.NEXT_PUBLIC_SMTP_USER,
        pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD,
      },
    } as SMTPTransport.Options);

    const sendEmailPromises = employees.map(async (emp) => {
      const { email } = emp;
      const cipherText = encryption(emp);
      const link = `${process.env.NEXT_PUBLIC_WEBSITE_LINK}/employee?user=${cipherText}`;

      return transporter.sendMail({
        from: `"Foodie" <${process.env.NEXT_PUBLIC_SMTP_FROM_EMAIL}>`,
        to: email,
        html: `Click Link: <a href="${link}">${link}</a>`,
      });
    });

    await Promise.all(sendEmailPromises);

    return NextResponse.json({ message: 'Messages sent successfully' }, { status: 200 });
  } catch (err) {
    console.error('Error sending emails:', err);
    return errorHandler(500, 'Internal server error');
  }
}
  