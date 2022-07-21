import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { createPostInput } from "../../schema/post.schema";
import { trpc } from "../../utils/trpc";

const CreatePostPage = () => {
  const { handleSubmit, register } = useForm<createPostInput>();
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(["posts.create-post"], {
    onSuccess({ id }) {
      router.push(`/posts/${id}`);
    },
  });

  const onSubmit = (values: createPostInput) => {
    mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && error.message}

      <h1>Create posts</h1>

      <input type="text" placeholder="Your post title" {...register("title")} />
      <input type="text" placeholder="Your post body" {...register("body")} />

      <button type="submit">Create</button>
    </form>
  );
};

export default CreatePostPage;
