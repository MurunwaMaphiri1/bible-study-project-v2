import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
    imageSrc: string;
    title: string;
    Description: string;
    DateCreated: Date;
    delay: number
    path: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
    imageSrc,
    title,
    Description,
    DateCreated,
    path,
}) => {
    return (
        <>
            <div className="flex flex-col gap-5 sm:flex-row">
                <div className="flex h-56 justify-center overflow-hidden">
                    <Image
                    width={1536}
                    height={1000}
                    alt={`${title} blog image`}
                    className="size-full object-cover transition-all duration-300 hover:scale-105"
                    aria-label={`${title} blog image`}
                    src={imageSrc}
                    />
                </div>
                <div className="flex-1 space-y-3">
                    <h2 className="mb-1 text-[19px] font-semibold dark:text-white">
                        {title}
                    </h2>
                    <p className="mb-4 text-[13px] dark:text-slate-300 line-clamp-5">
                        {Description}
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href={path}
                            rel="noopener noreferrer"
                            aria-label={`${title} read more link`}
                            className="group flex items-center justify-around gap-2 rounded-md bg-black/85 px-3 py-2 text-xs font-semibold text-white dark:bg-white dark:text-black"
                        >
                            Read More
                            <ArrowRight className="size-4 rounded-full border border-transparent stroke-1 transition-all duration-300 ease-linear group-hover:-rotate-45 group-hover:border-slate-50 group-hover:stroke-[2px] dark:group-hover:border-slate-950"/>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogCard;