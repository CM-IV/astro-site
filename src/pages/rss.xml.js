import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: "Oceanus Group",
    description: "Oceanus Group - innovation and success for your business.",
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      author: post.data.author,
      description: post.data.snippet,
      pubDate: post.data.publishDate,
      link: `/blog/${post.slug}/`,
    })),
  });
}
