import React from "react";
import Login from "./login";
import styles from "./loginForm.module.scss";
type Props = {};

export default function loginForm({}: Props) {
  return (
    <>
      <div className={styles.loginForm}>
        <Login />
      </div>
    </>
  );
}
