import type { Post } from "@/types/PostProps";

export const PostItem = async ({ postId }: { postId: string }) => {
  console.log("PostItem string", postId === "1");
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      //   cache: postId === "1" ? "default" : "no-store",
      // cache: "no-store",
      cache: "default",
    },
  );
  const todayDate = new Date().toLocaleString();

  const post: Post = await response.json();

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div className="w-1/2 rounded bg-white p-10 shadow-lg">
      <h1 className="mb-4 text-4xl font-bold text-blue-600">
        {post.title + todayDate}
      </h1>
      <p className="text-gray-700">{post.body}</p>
    </div>
  );
};
