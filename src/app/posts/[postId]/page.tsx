import type { Post } from "@/types/PostProps";
import Link from "next/link";
import { Suspense } from "react";

const isPostCached = (postId: string) => {
  return ["1", "2", "3", "4", "5", "6"].includes(postId);
};

export async function generateStaticParams() {
  // only pre render the first post, but have a good loading experience for the rest
  // const isPostPreBuilt = (postId: string) => {
  //   return ["1", "2", "3", "7", "8", "9"].includes(postId);
  // };
  return [
    { postId: "1" },
    { postId: "2" },
    { postId: "3" },
    { postId: "7" },
    { postId: "8" },
    { postId: "9" },
  ];
  // const posts: Post[] = await fetch(
  //   "https://jsonplaceholder.typicode.com/posts",
  // ).then((res) => res.json());

  // return posts
  //   .map((post) => ({
  //     postId: post.id.toString(),
  //   }))
  //   .slice(0, 5);
}

const PostItem = async ({ postId }: { postId: string }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      cache: isPostCached(postId) ? "default" : "no-store",
      // cache: "no-store",
      // cache: "default",
    },
  );
  const post: Post = await response.json();
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const todayDate = new Date().toLocaleString();

  return (
    <div className="w-1/2 rounded bg-white p-10 shadow-lg">
      <h1 className="mb-4 text-4xl font-bold text-blue-600">
        {post.title + todayDate}
      </h1>
      <p className="text-gray-700">{post.body}</p>
    </div>
  );
};

export default function Post({ params }: { params: { postId: string } }) {
  const datewithSeconds = new Date().toLocaleString();
  const exactDate = Date.now().toString();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <Suspense fallback={<div>loading............</div>}>
        <PostItem postId={params.postId} />
      </Suspense>
      <Link className="mt-4 hover:text-blue-500" href="/posts">
        Go Back {datewithSeconds} {exactDate}
      </Link>
    </div>
  );
}
