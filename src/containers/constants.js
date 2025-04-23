const API_URLS = {
  SIGNUP_API_URL: "http://44.206.196.76:5000/auth/register",
  LOGIN_API_URL: "http://44.206.196.76:5000/auth/login",
  SEND_OTP_URL: "http://44.206.196.76:5000/otp/send-email-otp",
  GENERATE_QR_URL: "http://44.206.196.76:5000/otp/generate-qr",
  VERIFY_TOTP_URL: "http://44.206.196.76:5000/otp/verify-totp",
  VERIFY_EMAIL_URL: "http://44.206.196.76:5000/otp/verify-email",
  VERIFIED_EMAILS_LIST: "http://44.206.196.76:5000/otp/list-verified-emails",
  GET_USER: "http://44.206.196.76:5000/auth/get-user",
  REQUEST_OTP_URL: "http://44.206.196.76:5000/otp/request-otp",
  VERIFY_OTP_URL: "http://44.206.196.76:5000/otp/verify-otp",
  TOGGLE_TOTP: "http://44.206.196.76:5000/auth/toggle-totp",
  TOGGLE_OTP: "http://44.206.196.76:5000/auth/toggle-otp",
  GOOGLE_LOGIN: "http://44.206.196.76:5000/auth/google",
};

export { API_URLS };
