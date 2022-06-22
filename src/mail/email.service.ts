import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'YOUR_GMAIL', // TODO: config
        pass: 'YOUR_PASSWORD', // TODO: config
      },
    });
  }

  async sendMemberJoinVerification(emailAddress: string, authCode: string) {
    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: authCode,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
