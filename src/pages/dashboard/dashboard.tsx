import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase";
import { useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import Finance from "./table/finance";
import Layout from "./layout";
import { ConfigProvider } from "antd";
import zhTW from "antd/locale/zh_TW";

type Props = {};
 
export default function dashboard({}: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in", user);
      } else {
        console.log("User is signed out");
        return navigate("/login");
      }
    });
  }, []);

  return (
    <ConfigProvider locale={zhTW}>
      <Layout />
    </ConfigProvider>
  );
} 
