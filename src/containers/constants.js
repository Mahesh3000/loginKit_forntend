const API_URLS = {
  SIGNUP_API_URL: "http://localhost:8000/auth/register",
  LOGIN_API_URL: "http://localhost:8000/auth/login",
  SEND_OTP_URL: "http://localhost:8000/otp/send-email-otp",
  GENERATE_QR_URL: "http://localhost:8000/otp/generate-qr",
  VERIFY_TOTP_URL: "http://localhost:8000/otp/verify-totp",
  VERIFY_EMAIL_URL: "http://localhost:8000/otp/verify-email",
  VERIFIED_EMAILS_LIST: "http://localhost:8000/otp/list-verified-emails",
  GET_USER: "http://localhost:8000/auth/get-user",
  VERIFY_OTP_URL: "http://localhost:8000/otp/verify-otp",
};

export { API_URLS };
