import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import styles from "./loginForm.module.scss";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';

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

  const onFinish = (values: any) => {
    // console.log("Success:", values);
    signInWithEmailAndPassword(auth, values.username, values.password)
      .then((cred) => {
        console.log("Sign in successful", cred);
      })
      .catch((err) => {
        console.log("Sign in failed", err);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  function handleLogout() {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful");
      })
      .catch((err) => {
        console.log("Sign out failed", err);
      });
  }

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
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Button type="primary" onClick={handleLogout}>
        Log Out
      </Button>
    </Form>
  );
};

export default App;