import Thumbnail from "../components/Thumbnail";
import type { NextPage, GetStaticProps } from "next";
import { IPost } from "../types/post";
import Link from "next/link";
import { getAllPosts } from "../utils/mdxutils";
import Head from "next/head";

// props type
type Props = {
  posts: [IPost];
};

// component render function
const Home: NextPage<Props> = ({ posts }: Props) => {
  return (
    <>
      <Head>
        <title>@ECHO D@H</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="The Resume Page of Nelson Alvarez" />
        <meta name="keywords" content="Devops,Operations,.NET" />
        <meta name="author" content="DebuggingaHopper" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>

        <h1 className="text-4xl font-bold mb-4 text-slate-200 text-TitleText">
          Technical Articles
        </h1>

        <div className="space-y-12">
          {posts.map((post) => (
            <div key={post.slug}>
              <h2 className="px-3 py-2 text-2xl font-semibold  hover:bg-primary hover:text-[#121517] transition-all duration-300 ease-in-out text-slate-200 text-Title">
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </h2>
              <h4 className="text-0.2 text-Date">{post.date}</h4>

              <p className="text-slate-50 font-bold mb-0.5 text-Description">
                {post.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

// get posts from serverside at build time
export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts([
    "title",
    "slug",
    "date",
    "description",
    "thumbnail",
  ]);

  // retunr the posts props
  return { props: { posts } };
};
