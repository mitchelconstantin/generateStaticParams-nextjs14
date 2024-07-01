import { Suspense } from "react";

function LoadingPosts() {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent`;
  return (
    <div className="col-span-4 mt-20 w-full space-y-4 lg:col-span-1">
      <div className={`relative h-[167px] rounded-xl bg-gray-900 ${shimmer}`} />
      <div className="h-4 w-full rounded-lg bg-gray-900" />
      <div className="h-6 w-1/3 rounded-lg bg-gray-900" />
      <div className="h-4 w-full rounded-lg bg-gray-900" />
      <div className="h-4 w-4/6 rounded-lg bg-gray-900" />
    </div>
  );
}

async function fetchPosts() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const data = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
    cache: "no-store",
  });
  const posts = await data.json();
  return posts;
}

async function BlogPost() {
  const posts = await fetchPosts();
  const post = posts[0];
  return (
    <div className="w-full">
      <h4 className="mb-2 text-lg">Title - {post.title}</h4>
      <p className="text-sm leading-6">
        {post.body} {post.body} {post.body} {post.body} {post.body} {post.body}{" "}
        {post.body} {post.body} {post.body} {post.body}
      </p>
    </div>
  );
}

async function Aside() {
  const posts = await fetchPosts();
  return (
    <aside className="w-full">
      <div>
        {posts.slice(0, 5).map((post: any) => (
          <ol key={post.id} style={{ listStyle: "inside" }}>
            <li className="w-full text-lg">
              <a href="#">{post.title}</a>
            </li>
          </ol>
        ))}
      </div>
    </aside>
  );
}

export default function Home() {
  return (
    <div className="flex justify-between pl-12 pr-12">
      <div className="w-[70%]">
        <h2 className="mb-6 text-2xl">Main Blog</h2>
        <Suspense fallback={<LoadingPosts />}>{<BlogPost />}</Suspense>
      </div>

      <div className="w-[25%] pl-10">
        <h2 className="mb-12 text-2xl">Latest Blog Posts</h2>
        <Suspense fallback={<LoadingPosts />}>{<Aside />}</Suspense>
      </div>
    </div>
  );
}
