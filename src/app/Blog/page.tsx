"use client";

import React from "react";
import BlogCard from "@/components/Blog/BlogCard";


type BlogItem = {
    id: number;
    imageSrc: string;
    title: string;
    Description: string;
    DateCreated: Date;
    path: string;
}

const blogItems: BlogItem[] = [
    {
        id: 1,
        imageSrc: "/Images/202020169_univ_cnt_1_xl.jpg",
        title: "Joseph's story: Having Faith that God will fulfill His promises",
        Description: "An exploration of the significant altars built by Abraham and what they represent in his spiritual journey.",
        DateCreated: new Date("2024-10-16T10:00:00Z"),
        path: "/blog/abrahams-altars"
    }
]

export default function Blogs() {

    const sortedBlogItems = blogItems.slice().sort((a, b) => 
        b.DateCreated.getTime() - a.DateCreated.getTime()
    );

    return (
        <>
            <div className="flex flex-col gap-20 p-7 max-w-3xl mx-auto">
                <div className="">
                    <h1 className="font-bold text-x1">
                        Blogs
                    </h1>
                    <p className="mt-2 text-[#707070]">
                        just jotting down my thoughts while doing bible study
                    </p>
                </div>
                {sortedBlogItems.map((blog, index) => (
                    <BlogCard
                        key={blog.id}
                        imageSrc={blog.imageSrc}
                        title={blog.title}
                        Description={blog.Description}
                        delay={index * 0.2}
                        DateCreated={blog.DateCreated}
                        path={blog.path}
                    />
                ))}
            </div>
        </>
    )
}
