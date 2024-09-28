import Thumbnail from '../components/Thumbnail';
import type { NextPage, GetStaticProps } from 'next'
import { IPost } from "../types/post";
import Link from 'next/link'
import { getAllPosts } from "../utils/mdxutils";

// props type
type Props = {
  posts: [IPost]
}

// component render function
const Home: NextPage<Props> = ({ posts }: Props) => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Technical articles</h1>

      <div className="space-y-12">
        {posts.map((post) => (
          <div key={post.slug}>
            <h2 className="border-primary border w-full px-3 py-2 text-2xl font-semibold rounded-full hover:bg-primary hover:text-teal-400 transition-all duration-300 ease-in-out">
              <Link href={`/posts/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <h4 className="text-0.2 font-bold mb-0.5">
                {post.date}
            </h4>

            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home

// get posts from serverside at build time
export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts([
    'title',
    'slug',
    'date',
    'description',
    'thumbnail'
  ]);

  // retunr the posts props
  return { props: { posts } }
}