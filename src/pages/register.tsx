import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";

const Register = () => {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(["users.register-user"], {
    onSuccess: () => {
      router.push("/login");
    },
  });

  const onSubmit = (values: CreateUserInput) => {
    mutate(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message} <h1>Register</h1>
        <input
          type="email"
          placeholder="jane.doe@example.com"
          {...register("email")}
        />
        <input type="text" placeholder="Jane" {...register("name")} />
        <button type="submit">Login</button>
      </form>
      <Link href="/login">Login</Link>
    </>
  );
};

export default Register;
