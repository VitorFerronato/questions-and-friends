import { number, object, string } from "yup";

export const RegisterSchema = object({
  name: string().required().label("Full name").min(2).max(50),
  email: string().required().label("Email").email(),
  password: string().required().label("Password").min(8).max(50),
});

export const LoginSchema = object({
  email: string().required().label("Email").email(),
  password: string().required().label("Password").min(8).max(50),
});

export const ForgotPasswordSchema = object({
  email: string().required().label("Email").email(),
});

export const WordSchema = object({
  word: string().required().label("Word"), 
  tips: string().required('Tips are required'),
  categorie: string().required('Categorie are required')
});
