import { getBlogPost, listBlogPosts } from '@/lib/blog'
import { Metadata } from 'next/types'
import { BookOpen } from 'lucide-react'

type BlogPageProps = {
    params: Promise<{ slug: string }>
}

export default async function BlogPage({ params }: BlogPageProps) {
    const { slug } = await params
    const { metadata, component: MDXContent, duration } = await getBlogPost(slug)

    return (
        <>
            <div className="mx-auto flex max-w-3xl p-4">
                <article className="mt-8">
                    <img src={metadata.imageSrc} alt={metadata.alt} className="w-full"/>
                    <h1 className="mt-5 text-[23px] font-semibold">{metadata.title}</h1>
                    <div className="mt-2 flex flex-row gap-2">
                        <BookOpen className="size-5 text-gray-400"/>
                        <p className="text-sm text-gray-500">{duration}</p>
                    </div>
                    <p className="mt-3 text-gray-400">{metadata.description}</p>
                    <hr className="mt-4 border-neutral-800"/>
                    <div className="content mt-4 text-gray-400">
                        <MDXContent/>
                    </div>
                </article>
            </div>
        </>
    )
}

export async function generateMetadata({
    params,
}: BlogPageProps): Promise<Metadata> {
    const { slug } = await params
    const { metadata } = await getBlogPost(slug)

    return {
        title: metadata.title,
        description: metadata.description,
    }
}

export async function generateStaticParams() {
    const blogPosts = await listBlogPosts()
    const blogStaticParams = blogPosts.map((post) => ({
        slug: post.slug,
    }))

    return blogStaticParams
}