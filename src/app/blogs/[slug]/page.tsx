import { getBlogPost, listBlogPosts } from "@/lib/blog"
import { Metadata } from 'next/types'

type BlogPageProps = {
    params: Promise<{ slug: string }>
}

// type BlogPostMetadata = {
//     title: string,
//     description: string,
//     date: string,
//     imageSrc: string,
//     alt: string,
// }

export default async function BlogPage({params}: BlogPageProps) {
    const { slug } = await params
    const { metadata, component: MDXContent } = await getBlogPost(slug)
    // const post = await import(`@/blogs/${slug}.mdx`)

    // const MDXContent = post.default 

    // const metadata: BlogPostMetadata = post.metadata
    // const title = metadata.title
    // const description = metadata.description
    // const date = new Date(metadata.date)
    // const imgUrl = metadata.imageSrc
    // const imgAlt = metadata.alt
    // const formattedDate = new Intl.DateTimeFormat('en-ZA', {
    //     day: 'numeric',
    //     month: 'short',
    //     year: 'numeric',
    // }).format(date)

    return (
        <>
            <div className="flex mx-auto max-w-3xl p-4">
                <article className="mt-8">
                    <img src={metadata.imageSrc} alt={metadata.alt} className="w-full"/>
                    <h1 className="mt-5 text-[23px] font-semibold">{metadata.title}</h1>
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