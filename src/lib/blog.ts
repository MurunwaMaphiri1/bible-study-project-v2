import type { Metadata } from "next";
import fs from 'node:fs/promises'
import path from 'node:path'
import readingDuration from "reading-duration";

export type BlogPostMetadata = Metadata & {
    title: string,
    description: string,
    date: string,
    imageSrc: string,
    alt: string,
}

export type BlogPostData = {
    slug: string
    metadata: BlogPostMetadata
    component: React.FC
    duration: string
}

export const getBlogPost = async (slug: string): Promise<BlogPostData> => {

    const postFilePath = path.join(process.cwd(), 'src/blogs', `${slug}.mdx`)

    const rawContent = await fs.readFile(postFilePath, 'utf-8')

    const duration = readingDuration(rawContent, {
        wordsPerMinute: 100,
        emoji: false
    })

    const post = await import(`@/blogs/${slug}.mdx`)
    const data = post.metadata 

    if (!data.title || !data.description) {
        throw new Error(`Missing some required metadata fields in: ${slug}`)
    }

    const metadata: BlogPostMetadata = {
        ...data,
        date: new Date(data.date),
        updatedDate: data.updatedDate ? new Date(data.updatedDate) : undefined
    }

    return {
        slug,
        metadata,
        component: post.default,
        duration,
    }
}

export const listBlogPosts = async (): Promise<
    Omit<BlogPostData, 'component'>[]> => {
        const files = await fs.readdir(path.join(process.cwd(), 'src/blogs'))

        return Promise.all(
            files.map(async (file) => {
                const slug = file.replace(/\.mdx$/,'')
                const { metadata, duration } = await getBlogPost(slug)
                return {
                    slug,
                    metadata,
                    duration,
                }
            }),
        )
}