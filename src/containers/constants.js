const API_URLS = {
  SIGNUP_API_URL: "http://3.80.199.153/auth/register",
  LOGIN_API_URL: "http://3.80.199.153/auth/login",
  SEND_OTP_URL: "http://3.80.199.153/otp/send-email-otp",
  GENERATE_QR_URL: "http://3.80.199.153/otp/generate-qr",
  VERIFY_TOTP_URL: "http://3.80.199.153/otp/verify-totp",
  VERIFY_EMAIL_URL: "http://3.80.199.153/otp/verify-email",
  VERIFIED_EMAILS_LIST: "http://3.80.199.153/otp/list-verified-emails",
  GET_USER: "http://3.80.199.153/auth/get-user",
  VERIFY_OTP_URL: "http://3.80.199.153/otp/verify-otp",
  TOGGLE_TOTP: "http://3.80.199.153/auth/toggle-totp",
  TOGGLE_OTP: "http://3.80.199.153/auth/toggle-otp",
  GOOGLE_LOGIN: "http://3.80.199.153/auth/google",
};

export { API_URLS };
