import React from 'react';
import BlogCard from '@/components/Blog/BlogCard';
import { listBlogPosts } from '@/lib/blog';


export default async function Blogs() {

    const blogItems = await listBlogPosts();

    const sortedBlogItems = blogItems.slice().sort((a, b) => 
        new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );

    return (
        <>
            <div className="flex flex-col gap-20 p-4 max-w-3xl mx-auto">
                <div className="">
                    <h1 className="font-bold text-x1">
                        Blogs
                    </h1>
                    <p className="mt-2 text-[#707070]">
                        Deep dives into God&apos;s Word, sharing insights to inspire and strengthen your daily walk with Christ.
                    </p>
                </div>
                {sortedBlogItems.map((blog, index) => (
                    <BlogCard
                        key={blog.slug}
                        imageSrc={blog.metadata.imageSrc}
                        title={blog.metadata.title}
                        Description={blog.metadata.description}
                        delay={index * 0.2}
                        DateCreated={new Date(blog.metadata.date)}
                        path={`/blogs/${blog.slug}`}
                    />
                ))}
            </div>
        </>
    )
}
