import dynamic from "next/dynamic";
import React from "react";
const LoginForm = dynamic(() => import("../component/LoginForm"), {
  ssr: false,
});

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
