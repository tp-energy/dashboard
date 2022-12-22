import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import styles from "./loginForm.module.scss";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const navigate = useNavigate();

  // check user state
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in", user);
        navigate("/dashboard");
      } else {
        console.log("User is signed out");
      }
    });
  }, []);

  // display error message
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const onFinish = (values: any) => {
    // console.log("Success:", values);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((cred) => {
        // console.log("Sign in successful", cred);
      })
      .catch((err) => {
        const errMsg = err.toString();
        if (errMsg.includes("invalid-email")) {
          setErrorMessage("信箱格式錯誤");
        }
        if (errMsg.toString().includes("user-not-found")) {
          setErrorMessage("無此用戶");
        }
        if (errMsg.toString().includes("wrong-password")) {
          setErrorMessage("密碼錯誤");
        }
        // console.log("Sign in failed", err);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles.login}
    >
      <Form.Item
        label="信箱"
        name="email"
        rules={[{ required: true, message: "請輸入登入用信箱" }]}
        className={styles.loginLabel}
      >
        <Input className={styles.loginInput} />
      </Form.Item>

      <Form.Item
        label="密碼"
        name="password"
        rules={[{ required: true, message: "請輸入密碼" }]}
        className={styles.loginLabel}
      >
        <Input.Password className={styles.loginInput} />
      </Form.Item>

      {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>記住我</Checkbox>
      </Form.Item> */}
      <div className={styles.error}>{errorMessage}</div>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          登入
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
