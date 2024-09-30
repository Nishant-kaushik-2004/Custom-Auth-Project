import { User } from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

type EmailParams = {
  email: string;
  emailType: string;
  userId: string; // Adjust types accordingly
};

const SendEmail = async ({ email, emailType, userId }: EmailParams) => {
  try {
    //configure mail for usage
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000, // expiry in 1 hour from now
        },
      });
      console.log("found by id for VERIFY");
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyPassword: hashedToken,
          verifyPasswordExpiry: Date.now() + 3600000,
        },
      });
      console.log("found by id for RESET");
    }
    const htmlBody = (emailOrPassword: string) => `<p>Click <a href="${
      process.env.DOMAIN
    }/verify${emailOrPassword}?token=${hashedToken}">here</a> to ${
      emailType === "VERIFY" ? "Verify your email" : "reset your password"
    } or copy and paste the link below in your browser.
    <br>
    ${process.env.DOMAIN}/verify${emailOrPassword}?token=${hashedToken}
    </P>`;

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "a31fef066bebd9", // 🔥❌
        pass: "c28e1b50a40bce", // ❌
      },
    });
    const mailOptions = {
      from: "example@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      // text: "Hello world?", // plain text body
      html: emailType === "VERIFY" ? htmlBody("email") : htmlBody("password"),
    };
    console.log("reached mailResponse");
    const mailResponse = await transport.sendMail(mailOptions);
    console.log("passed mailResponse");
    console.log(mailResponse);
    return mailResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred while sending Email");
    }
  }
};
export default SendEmail;
