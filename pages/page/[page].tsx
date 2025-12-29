
import Thumbnail from "../../components/Thumbnail";
import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { IPost } from "../../types/post";
import Link from "next/link";
import { getPaginatedPosts, getTotalPages } from "../../utils/mdxutils";
import Head from "next/head";
import Pagination from "../../components/Pagination";
import { ParsedUrlQuery } from "querystring";

// props type
type Props = {
  posts: IPost[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
};

const POSTS_PER_PAGE = 10; // Must match the value in index.tsx

interface IParams extends ParsedUrlQuery {
  page: string;
}

// component render function
const BlogPage: NextPage<Props> = ({ posts, currentPage, totalPages, totalPosts }: Props) => {
  return (
    <>
      <Head>
        <title>@ECHO D@H - Page {currentPage}</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="The Resume Page of Nelson Alvarez" />
        <meta name="keywords" content="Devops,Operations,.NET" />
        <meta name="author" content="DebuggingaHopper" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4 text-slate-200 text-TitleText">
            Recent Posts - Page {currentPage}
          </h1>
          <p className="text-Description text-sm">
            Showing {posts.length} of {totalPosts} posts
          </p>
        </div>
        
        <div className="space-y-12">
          {posts.map((post) => (
            <div key={post.slug}>
              <h2 className="px-3 py-2 text-2xl font-semibold transition-all duration-300 ease-in-out text-slate-200 underline text-Title">
                <Link href={`/posts/${post.slug}`} className="hover:text-[#fff6a2]">
                  {post.title}
                </Link>
              </h2>
              <h4 className="text-0.2 text-Date">🗓️{post.date}</h4>
              <p className="text-slate-50 mb-0.5 text-Description">
                {post.description}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages}
          basePath="/"
        />
      </div>
    </>
  );
};

export default BlogPage;

// Generate static paths for all pages
export const getStaticPaths: GetStaticPaths = async () => {
  const totalPages = getTotalPages(POSTS_PER_PAGE);
  
  // Generate paths for pages 2 through totalPages
  // (Page 1 is handled by index.tsx)
  const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
    params: { page: (i + 2).toString() },
  }));
  
  return {
    paths,
    fallback: false,
  };
};

// get posts from serverside at build time
export const getStaticProps: GetStaticProps = async (context) => {
  const { page } = context.params as IParams;
  const pageNumber = Number(page) || 1;
  
  const { posts, currentPage, totalPages, totalPosts } = getPaginatedPosts(
    pageNumber,
    POSTS_PER_PAGE,
    ["title", "slug", "date", "description", "thumbnail"]
  );
  
  // Redirect to 404 if page doesn't exist
  if (posts.length === 0) {
    return {
      notFound: true,
    };
  }
  
  // return the posts props
  return { 
    props: { 
      posts,
      currentPage,
      totalPages,
      totalPosts,
    } 
  };
};