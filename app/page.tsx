import Image from "next/image";
import Link from "next/link";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";
import * as matter from "gray-matter";
import { BLOG_PATH } from "@/app/constant";

function getAllBlogs() {
  const article = [];
  const fileName: string[] = readdirSync(BLOG_PATH).filter((path) => path.includes('.mdx'));
  for (let file in fileName) {
    let fda = matter.read(join(BLOG_PATH, fileName[file]));
    article.push({ filename: fileName[file].replace(/\.mdx?$/, ""), ...fda });
  }
  article.sort((a, b) => {
    if (a.data.time > b.data.time) return -1;
    else return 1;
  });
  return article;
}
//TODO:Still refactor is required
export default function Home() {
  const blog = getAllBlogs();
  return (
    <section className="xl:mx-40 lg:mx-28 md:mx-10 mx-5 pt-20 space-y-8">
      <h2 className="text-xl font-semibold">Welcome to the blog</h2>
      <section className=" space-y-4">
        <h3 className="text-base font-semibold">Latest blog</h3>
        {blog.length===0 && 
            (<article className="min-h-32 drop-shadow-md hover:bg-gray-800 rounded py-6 space-y-2 px-2 transition-colors">
              No Latest Blogs
              </article>)
        }

        {blog.length > 0 && (
          <Link href={`blog/${blog[0].filename}`}>
            <article className="min-h-32 drop-shadow-md hover:bg-gray-800 rounded py-6 space-y-2 px-2 transition-colors">
              <h4 className="text-base font-medium">{blog[0].data.title}</h4>
              <p className="text-sm text-gray-300">
                Description:{blog[0].data.description}
              </p>
              <time>
                <p className="text-right text-xs">
                  {new Date(blog[0].data.time).toDateString()}
                </p>
              </time>
            </article>
          </Link>
        )}
      </section>
      <section className="space-y-4">
        <h3 className="text-base font-semibold">Blogs</h3>
        {blog.length===0 && 
            (<article className="min-h-32 drop-shadow-md hover:bg-gray-800 rounded py-6 space-y-2 px-2 transition-colors">
              No Blogs
              </article>)
        }
        {blog.length > 0 &&
          blog.map(({ filename, data }) => (
            <Link key={data.title} href={`blog/${filename}`}>
              <article className="min-h-32 drop-shadow-md hover:bg-gray-800 rounded py-6 space-y-2 px-2 transition-colors">
                <h4 className="text-base font-medium">{data.title}</h4>
                <p className="text-sm text-gray-300">
                  Description: {data.description}
                </p>
                <time>
                  <p className="text-right text-xs">
                    {new Date(data.time).toDateString()}
                  </p>
                </time>
              </article>
            </Link>
          ))}
      </section>
    </section>
  );
}
