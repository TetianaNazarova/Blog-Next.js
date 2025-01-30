import fs from "fs";
import path from "path";
import { compileMDX } from 'next-mdx-remote/rsc'
import H1 from "@/components/h1";

type Params = {
    newest?: boolean;
    page?: number;
    limit?: number;
    tags?: string[];  // Add 'tags' to the type definition
}

export function loadPost(slug: any) {
    const filename = slug.endsWith('.mdx') ? slug : `${slug}.mdx`

    return fs.readFileSync(
        path.join(process.cwd(), 'content', filename)
    )
}

export async function getPost(slug: any) {
    const source = loadPost(slug)

    return await compileMDX({
        source,
        components: {
            h1: (props) => <H1 { ...props } />
        },
        options: {
            parseFrontmatter: true
        }
    })
}

export async function getPosts({
    newest = true,
    page = 1,
    limit = 3,
    tags,
 } = {} as Params) {
    const files  = fs.readdirSync(
        path.join(
            process.cwd(), 'content'
        )
    )

    const posts = await Promise.all(
        files.map(async (filename) => {
            const { frontmatter} = await getPost(filename)

            return {
                frontmatter,
                slug: filename.replace('.mdx', '')
            }
        }))

    let filteredPosts = posts

    if (tags) {
        filteredPosts = filteredPosts.filter((post: any) => post.frontmatter.tags.some(
            (tag: never) => tags.includes(tag)
        ))
    }

    if (newest) {
        filteredPosts.sort(
            (a: any, b: any) => {
                const dateA: any = new Date(a.frontmatter.date)
                const dateB: any = new Date(b.frontmatter.date)

                return dateB - dateA
            }
        )
    } else {
        filteredPosts.sort(
            (a: any, b: any) => {
                const dateA: any = new Date(a.frontmatter.date)
                const dateB: any = new Date(b.frontmatter.date)

                return dateA - dateB
            }
        )
    }

    const startIndex: number = (page - 1) * limit
    const endIndex: number = page * limit


    return {
        posts: filteredPosts.slice(startIndex, endIndex),
        pageCount: Math.ceil(filteredPosts.length / limit)
    }
}
