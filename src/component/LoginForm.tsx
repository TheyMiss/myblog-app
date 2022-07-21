import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

const VerifyToken = ({ hash }: { hash: string }) => {
  const { data, isLoading } = trpc.useQuery(["users.verify-otp", { hash }]);
  const router = useRouter();

  if (isLoading) {
    return <p>Verifying...</p>;
  }

  router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/");

  return <p>Redirecting...</p>;
};

const LoginForm = () => {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(["users.request-otp"], {
    onSuccess: () => {
      setSuccess(true);
    },
  });

  const onSubmit = (values: CreateUserInput) => {
    mutate({ ...values, redirect: router.asPath });
  };

  const hash = router.asPath.split("#token=")[1];

  if (hash) {
    return <VerifyToken hash={hash} />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        {success && <p>Check yoor email</p>}
        <h1>Login</h1>
        <input
          type="email"
          placeholder="jane.doe@example.com"
          {...register("email")}
        />
        <input type="text" placeholder="Jane" {...register("name")} />
        <button type="submit">Login</button>
      </form>
      <Link href="/register">Register</Link>
    </>
  );
};

export default LoginForm;
