const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendConfirmationEmail(email, booking) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Hotel Booking Confirmation',
    text: `Thank you for your booking!\n\nBooking ID: ${booking.id}\nRoom: ${booking.roomName}\nCheck-in: ${booking.checkIn}\nCheck-out: ${booking.checkOut}\nTotal Price: $${booking.totalPrice}`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  sendConfirmationEmail,
};