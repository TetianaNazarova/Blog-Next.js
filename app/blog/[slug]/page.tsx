import {notFound} from "next/navigation";
import {getPost as getPostNotCached, getPosts} from "@/lib/posts";
import {cache} from 'react';
import Link from "next/link";

const getPost = cache(
    async (slug: any) => await getPostNotCached(slug)
)

export async function generateStaticParams() {
    const { posts } = await getPosts({ limit: 1000 })
    const params: any = posts.map((post: any) => ({
        slug: post.slug
    }))
    return params
}

export async function generateMetadata({ params }: any) {
    const param = await params

    try {
        const { frontmatter } = await getPost(param.slug)
        return frontmatter
    } catch (e) { }

}

export default async function BlogPage({ params }: any) {
    const blogParams = await params

    let post: any

    try {
        post = await getPost(blogParams.slug)
    } catch(e) {
        console.error('e', e)
        notFound()
    }

    return (
        <article className="prose dark:prose-invert">
            <div className="flex space-x-2 mb-8">
                {post.frontmatter.tags.map((tag: string) => <Link key={tag} href={`/blog/?tags=${tag}`}
                className="dark:text-gray-400 text-gray-500"
                >#{tag}</Link>)}
            </div>
            {post.content}
        </article>
    )
}
