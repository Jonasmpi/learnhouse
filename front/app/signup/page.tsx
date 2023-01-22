"use client";
import React from "react";
import { Header } from "../../components/UI/Header";
import Layout from "../../components/UI/Layout";
import { Title } from "../../components/UI/Elements/Styles/Title";
import { signup } from "../../services/auth/auth";

const SignUp = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({ email, password, username });
    alert(JSON.stringify({ email, password, username }));
    signup({ email, password, username });
  };

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  return (
    <div>
      <Layout title="Sign up">
      <Header></Header>
        <Title>Sign up </Title>

        <form>
          <input onChange={handleUsernameChange} type="text" placeholder="username" />
          <input onChange={handleEmailChange} type="text" placeholder="email" />
          <input onChange={handlePasswordChange} type="password" placeholder="password" />
          <button onClick={handleSubmit} type="submit">
            Sign up
          </button>
        </form>
      </Layout>
    </div>
  );
};
export default SignUp;