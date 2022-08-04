import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { marked } from "marked";
import { getPost } from "~/models/post.server";
import invariant from "tiny-invariant";

export async function loader({ params }: LoaderArgs) {
  const { slug } = params;
  if (!slug) throw new Error(`params.slug is required`);

  const post = await getPost(slug);
  invariant(post, `Post not found: ${params.slug}`);

  const html = marked(post.markdown);

  return json({ post, html });
}

export default function PostSlug() {
  const { post, html } = useLoaderData<typeof loader>();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
