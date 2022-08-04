import { useLoaderData } from "@remix-run/react";
import { Link } from "react-router-dom";
import { json } from "@remix-run/node";
import { prisma } from "~/db.server";

async function getPosts() {
  return prisma.post.findMany();
}

export const loader = async () => {
  return json({
    posts: await getPosts(),
  });
};

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
