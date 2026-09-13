"use server";

import { signup } from "@/lib/shopdb";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { z } from "zod";

type PrevState = {
  errors?: Record<string, string>;
  error?: string;
} | null;

const createUserSchema = (lang: "fa" | "en") =>
  z
    .object({
      username: z
        .string()
        .min(3, lang === "fa" ? "نام کاربری حداقل ۳ کاراکتر" : "Min 3 chars"),
      email: z.string().email(
        lang === "fa" ? "ایمیل نامعتبر است" : "Invalid email",
      ),
      phoneNumber: z
        .string()
        .regex(/^09\d{9}$/, lang === "fa" ? "شماره موبایل نامعتبر" : "Invalid phone"),
      address: z.string().min(1, lang === "fa" ? "آدرس الزامی است" : "Address required"),
      country: z.string().min(1),
      city: z.string().min(1),
      birthday: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, lang === 'fa' ? 'تاریخ نامعتبر است' : "Invalid date"),
      password: z
        .string()
        .min(8, lang === "fa" ? "رمز حداقل ۸ کاراکتر" : "Min 8 chars")
        .regex(/[a-z]/, lang === 'fa' ? 'باید شامل حروف کوچک انگلیسی باشه' : "Must contain lowercase")
        .regex(/[A-Z]/, lang === 'fa' ? 'باید شامل حروف بزرگ انگلیسی باشه' : "Must contain uppercase")
        .regex(/\d/, lang === 'fa' ? 'باید شامل اعداد باشه' : "Must contain number")
        .regex(/[^A-Za-z0-9]/, lang === 'fa' ? 'باید شامل کاراکتر های ویژه باشه' : "Must contain special char"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: lang === "fa" ? "رمزها یکسان نیستند" : "Passwords do not match",
    });

export default async function signupAction(
  lang: "fa" | "en",
  prevState: PrevState,
  formData: FormData,
) {
  const userConfirm = {
    username: formData.get("username")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phoneNumber: formData.get("phoneNumber")?.toString() ?? "",
    address: formData.get("address")?.toString() ?? "",
    country: formData.get("country")?.toString() ?? "",
    city: formData.get("city")?.toString() ?? "",
    birthday: formData.get("birthday")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
    confirmPassword: formData.get("confirmPassword")?.toString() ?? "",
  };

  const parseResult = createUserSchema(lang).safeParse(userConfirm);

  if (!parseResult.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parseResult.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return { errors: fieldErrors };
  }

  const data = parseResult.data;

  const signupResult = await signup(
    data.username,
    data.email,
    data.phoneNumber,
    data.address,
    data.country,
    data.city,
    data.birthday,
    data.password,
  );

  if (signupResult?.error) {
    const err = signupResult.error.toLowerCase();
    if (err.includes("email")) {
      return { errors: { email: lang === 'fa' ? 'این ایمیل قبلا ثبت شده است' : "This email is already registered." } };
    }
    if (err.includes("username")) {
      return { errors: { username: lang === 'fa' ? 'این نام کاربری قبلا ثبت شده است' : "This username is already taken." } };
    }
    return { error: lang === 'fa' ? 'یه مشکلی پیش اومده. لطفا بعدا دوباره تلاش کنید' : "Something went wrong. Please try again." };
  }

  const user = await getCurrentUser();

  if (user) {
    redirect(`/${lang}/profile`);
  }

  redirect(`/${lang}`);
}