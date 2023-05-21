import { body } from "express-validator";

export const registerValidation = [
  body("email", "Укажите корректный email").isEmail(),
  body("password", "Минимальная длина пароля 5 символов").isLength({ min: 5 }),
  body("fullName", "минимальная длина имени 3 символа").isLength({ min: 3 }),
  body("avatarUrl", "укажите корректную ссылку").optional().isURL(),
];

export const loginValidation = [
  body("email", "Укажите корректный email").isEmail(),
  body("password", "Минимальная длина пароля 5 символов").isLength({ min: 5 }),
];

export const postCreateValidation = [
  body("title", "Введите заголовок статьи, минимальная длина 3 символа")
    .isLength({ min: 3 })
    .isString(),
  body("text", "Введите текст статьи, минимальная длина 3 символа")
    .isLength({ min: 3 })
    .isString(),
  body("tags", "Укажите тэги в виде массива").optional().isArray(),
  body("imageUrl", "Укажите ссылку на изображение")
    .optional()
    .isLength({ min: 6 })
    .isString(),
];
