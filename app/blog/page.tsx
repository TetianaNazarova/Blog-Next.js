import {getPosts} from "@/lib/posts";
import Link from "next/link";
import Pagination from "@/components/pagination";
import H1 from "@/components/h1";

export default async function BlogPostsPage({ searchParams }: any) {
    const params = await searchParams
    const tags = params.tags?.split(',')
    const order = params.order ?? 'newest'
    const page = params.page ?? 1
    const limit = params.limit ?? 3
    const { posts, pageCount } = await getPosts({
        newest: order === 'newest',
        page,
        limit,
        tags,
    })

    return (
        <>
            <H1>Recent Posts</H1>

            <div className="text-lg text-gray-600 dark:text-gray-400 mb-8">Stay up to date with most recent posts</div>

            <hr/>

            <div className="mb-8">
                Display&nbsp;
                {order === 'newest' && <Link href="/blog?order=oldest"
                                             className="underline"
                >oldest</Link>}
            </div>

            <div className="mb-8">
                Display&nbsp;
                {order === 'oldest' && <Link href="/blog?order=newest"
                                             className="underline"
                >newest</Link>}
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post: any) => (
                    <li key={post.slug}>
                        <Link href={`/blog/${post.slug}`}
                              className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{post.frontmatter.title}</Link>
                        <div className="text-gray-400 text-sm mt-2">{post.frontmatter.date}</div>
                    </li>
                ))}
            </ul>
            <div className="mt-8">
                <Pagination pageCount={pageCount}/>
            </div>
        </>
    )
}
