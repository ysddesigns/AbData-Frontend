export const parseEmailOrPhone = (emailOrPhone: any) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let email = null;
  let phone = null;

  if (emailPattern.test(emailOrPhone)) {
    email = emailOrPhone;
  } else {
    phone = emailOrPhone;
  }

  return { email, phone };
};
