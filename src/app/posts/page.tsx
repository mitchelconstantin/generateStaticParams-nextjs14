import type { Post } from "@/types/PostProps";
import Link from "next/link";
import { Suspense } from "react";
// posts
// 1 : cached + pre-built
// 2 : cached + pre-built
// 3 : cached + pre-built
// 4 : cached + not pre-built
// 5 : cached + not pre-built
// 6 : cached + not pre-built
// 7 : not cached + pre-built
// 8 : not cached + pre-built
// 9 : not cached + pre-built
// 10 : not cached + not pre-built
// 11 : not cached + not pre-built
// 12 : not cached + not pre-built

const isPostCached = (postId: number) => {
  return [1, 2, 3, 4, 5, 6].includes(postId);
};

const isPostPreBuilt = (postId: number) => {
  return [1, 2, 3, 7, 8, 9].includes(postId);
};

const PostsList = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });

  const posts: Post[] = await response.json();
  await new Promise((resolve) => setTimeout(resolve, 500));

  const getTitle = (postId: number) => {
    if (isPostCached(postId) && isPostPreBuilt(postId)) {
      return "When cachable and pre built, the page is built at build time and served from cache. The return is instant.";
    }
    if (isPostCached(postId) && !isPostPreBuilt(postId)) {
      return "When cachable but not pre built, the page is built at request time and eventually served from cache. The return is delayed with no loading experience, just a pause. Future visits are instant. This is the scenario where we want to be able to cache the page, but we don't want to pre-build it. It doesn't seem possible to have a loading experience in this scenario.";
    }
    if (!isPostCached(postId) && isPostPreBuilt(postId)) {
      return "When not cachable and is pre-built, when partial static generation is used, you get a static loading page served from cache created at build time, and the full page loads in dynmaically. The loading page is instant. The final page is not cached at all, since it is dyynamic";
    }
    if (!isPostCached(postId) && !isPostPreBuilt(postId)) {
      return "When not cachable and not pre-built, when partial static generation is used, the loading page is built on demand and served from the cache, future visits will use this cached version. The final page is not cached at all and is dynamic.";
    }
  };
  return (
    <>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <a
              href={`/posts/${post.id}`}
              key={post.id}
              className="rounded-lg bg-white p-6 shadow"
            >
              <h2 className="text-lg font-bold text-gray-800">{`is cachable?: ${isPostCached(post.id) ? "yes" : "no"}`}</h2>
              <h2 className="text-lg font-bold text-gray-800">{`is pre-built?: ${isPostPreBuilt(post.id) ? "yes" : "no"}`}</h2>
              <p className="text-gray-700">{getTitle(post.id)}</p>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">No posts found.</p>
      )}
    </>
  );
};

export default async function PostPage() {
  // const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  // const posts: Post[] = await response.json();
  const todayDate = new Date().toLocaleString();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800">Post Title</h1>
          <Link href="/" className="text-blue-600">
            Back to home {todayDate}
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <Suspense fallback={<div>Loading Posts using PPR...</div>}>
          <PostsList />
        </Suspense>
      </main>
      <footer className="bg-gray-200">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            © 2022 Your Website. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
