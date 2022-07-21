import React from "react";
import { trpc } from "../../utils/trpc";
import Link from "next/link";

const PostListingPage = () => {
  const { data, isLoading } = trpc.useQuery(["posts.posts"]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No data</p>;
  }

  return (
    <div>
      {data?.map((post) => {
        return (
          <article key={post.id}>
            <p>{post.title}</p>
            <Link href={`/posts/${post.id}`}>Read Post</Link>
          </article>
        );
      })}
    </div>
  );
};

export default PostListingPage;
