import React, { Suspense } from 'react'
import { client } from "@/sanity/lib/client";
import {
    STARTUP_BY_ID_QUERY,
  } from "@/sanity/lib/queries";
  import { notFound } from "next/navigation";

async function StartupContent({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

    if (!post) return notFound();
    
    return (
        <section className="pink_container !min-h-[230px]">
            <h1 className="text-3xl">{post.title}</h1>
        </section>
    );
}

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
    return (
        <Suspense fallback={
            <section className="pink_container !min-h-[230px]">
                <div className="h-8 w-64 bg-gray-200 animate-pulse rounded" />
            </section>
        }>
            <StartupContent params={params} />
        </Suspense>
    );
};
  
export default Page;
  