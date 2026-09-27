import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Send Booking Confirmation Email
 */
export const sendBookingConfirmationEmail = async (booking) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.log(
      `[Email Simulation] Confirmation email for booking ${booking.bookingId} would be sent to: ${booking.userEmail}`
    );
    return;
  }

  const hotelName = booking.hotelId?.name || "Luxe Hotel & Suites";
  const hotelAddress = booking.hotelId?.address || "Premier Location";
  const checkInStr = new Date(booking.checkIn).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const checkOutStr = new Date(booking.checkOut).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM || `"QuickStay Reservations" <${process.env.SMTP_USER}>`,
    to: booking.userEmail,
    subject: `Booking Confirmed: ${booking.bookingId} - ${hotelName}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; color: #1e293b;">
        <div style="background-color: #0f172a; padding: 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">QuickStay</h1>
          <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 14px;">Reservation Confirmation</p>
        </div>
        
        <div style="padding: 24px;">
          <p style="font-size: 16px; margin-top: 0;">Hello <strong>${booking.userName || "Guest"}</strong>,</p>
          <p style="font-size: 14px; color: #64748b; line-height: 1.6;">
            Your reservation is confirmed! We look forward to welcoming you at <strong>${hotelName}</strong>.
          </p>
          
          <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Booking ID:</td>
                <td style="padding: 8px 0; font-weight: 600; text-align: right;">${booking.bookingId}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Hotel:</td>
                <td style="padding: 8px 0; font-weight: 600; text-align: right;">${hotelName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Address:</td>
                <td style="padding: 8px 0; font-weight: 500; text-align: right;">${hotelAddress}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Room Type:</td>
                <td style="padding: 8px 0; font-weight: 600; text-align: right;">${booking.roomType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Check-In:</td>
                <td style="padding: 8px 0; font-weight: 600; text-align: right;">${checkInStr}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Check-Out:</td>
                <td style="padding: 8px 0; font-weight: 600; text-align: right;">${checkOutStr}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Total Duration:</td>
                <td style="padding: 8px 0; font-weight: 600; text-align: right;">${booking.nights} Night(s)</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Guests:</td>
                <td style="padding: 8px 0; font-weight: 600; text-align: right;">${booking.guests} Guest(s)</td>
              </tr>
              <tr style="border-top: 1px solid #e2e8f0;">
                <td style="padding: 12px 0 4px 0; font-weight: 700; font-size: 16px;">Total Paid:</td>
                <td style="padding: 12px 0 4px 0; font-weight: 700; font-size: 16px; color: #16a34a; text-align: right;">$${booking.totalAmount}</td>
              </tr>
            </table>
          </div>

          <p style="font-size: 13px; color: #94a3b8; text-align: center; margin-bottom: 0;">
            Need to manage or cancel your reservation? Visit your <a href="${process.env.CLIENT_URL || "http://localhost:5173"}/my-bookings" style="color: #2563eb; text-decoration: none;">My Bookings</a> dashboard.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent successfully to ${booking.userEmail}`);
  } catch (error) {
    console.error("Nodemailer dispatch error:", error.message);
  }
};
