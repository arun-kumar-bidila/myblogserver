import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();
const transport=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.APP_USER,
        pass:process.env.APP_PASS
    }

});

const sendMail=async (email,otp)=>{
    await transport.sendMail({
        from:process.env.APP_USER,
        to:email,
        subject:"Verify Otp",
        html:`
      <h2>Verify Otp</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP expires in 10 minutes.</p>
    `,

    });
};

export default sendMail;



