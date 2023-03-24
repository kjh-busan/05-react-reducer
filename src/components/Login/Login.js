import React, { useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const formReducer = (state, action) => {
  if (action.type === "USER_INPUT_EMAIL") {
    return {
      valueEmail: action.val,
      valuePassword: state.value,
      isValidEmail: action.val.includes("@"),
      isValidPassword: state.isValidPassword,
    };
  } else if (action.type === "USER_INPUT_PASSWORD") {
    return {
      valueEmail: state.value,
      valuePassword: action.val,
      isValidEmail: state.isValidEmail,
      isValidPassword: action.val.trim().length > 6,
    };
  } else if (action.type === "BLUR_EMAIL") {
    return {
      valueEmail: state.value,
      valuePassword: state.value,
      isValidEmail: state.valueEmail,
      isValidPassword: state.isValidPassword,
    };
  } else if (action.type === "BLUR_PASSWORD") {
    return {
      valueEmail: state.value,
      valuePassword: state.value,
      isValidEmail: state.isValidEmail,
      isValidPassword: state.valuePassword,
    };
  }
  return {
    email: "",
    password: "",
    isValidEmail: false,
    isValidPassword: false,
  };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [formState, dispatchForm] = useReducer(formReducer, {
    valueEmail: "",
    valuePassword: "",
    isValidEmail: null,
    isValidPassword: null,
  });

  const emailChangeHandler = (event) => {
    dispatchForm({
      type: "USER_INPUT_EMAIL",
      val: event.target.value,
    });

    setFormIsValid(
      event.target.value.includes("@") && formState.isValidPassword
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchForm({
      type: "USER_INPUT_PASSWORD",
      val: event.target.value,
    });
    setFormIsValid(
      formState.isValidEmail && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchForm({ type: "BLUR_EMAIL" });
  };

  const validatePasswordHandler = () => {
    dispatchForm({ type: "BLUR_PASSWORD" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(formState.valueEmail, formState.valuePassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            formState.isValidEmail === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formState.valueEmail || ""}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            formState.isValidPassword === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formState.valuePassword || ""}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            autoComplete="off"
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
