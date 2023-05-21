import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import styles from "./Login.module.scss";

export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const action = await dispatch(fetchRegister(data));
    console.log(action);
    if (!action.payload) {
      alert("Не удалось зарегестрироваться");
    }
    if ("token" in action.payload) {
      localStorage.setItem("token", action.payload.token);
      reset();
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Полное имя"
          fullWidth
          error={Boolean(errors.fullName)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Укажите полное имя" })}
        />

        <TextField
          className={styles.field}
          label="E-Mail"
          fullWidth
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
        />

        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
        />

        <Button
          type="submit"
          size="large"
          variant="contained"
          fullWidth
          disabled={!isValid}
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
