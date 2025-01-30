const API_URLS = {
  SIGNUP_API_URL: "http://98.82.175.42:8000/auth/register",
  LOGIN_API_URL: "http://98.82.175.42:8000/auth/login",
  SEND_OTP_URL: "http://98.82.175.42:8000/otp/send-email-otp",
  GENERATE_QR_URL: "http://98.82.175.42:8000/otp/generate-qr",
  VERIFY_TOTP_URL: "http://98.82.175.42:8000/otp/verify-totp",
  VERIFY_EMAIL_URL: "http://98.82.175.42:8000/otp/verify-email",
  VERIFIED_EMAILS_LIST: "http://98.82.175.42:8000/otp/list-verified-emails",
  GET_USER: "http://98.82.175.42:8000/auth/get-user",
  REQUEST_OTP_URL: "http://98.82.175.42:8000/otp/request-otp",
  VERIFY_OTP_URL: "http://98.82.175.42:8000/otp/verify-otp",
  TOGGLE_TOTP: "http://98.82.175.42:8000/auth/toggle-totp",
  TOGGLE_OTP: "http://98.82.175.42:8000/auth/toggle-otp",
  GOOGLE_LOGIN: "http://98.82.175.42:8000/auth/google",
};

export { API_URLS };
