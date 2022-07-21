import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../utils/trpc";
import Error from "next/error";

const SinglePostPage = () => {
  const router = useRouter();

  const postId = router.query.postId as string;

  const { data, isLoading } = trpc.useQuery(["posts.single-post", { postId }]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <Error statusCode={404} />;
  }

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.body}</p>
    </div>
  );
};

export default SinglePostPage;
