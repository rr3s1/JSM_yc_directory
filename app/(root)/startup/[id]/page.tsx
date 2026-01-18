import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import DOMPurify from "isomorphic-dompurify";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import ViewTracker from "@/components/ViewTracker";

const md = markdownit({ html: false });

const StartupRoute = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return <StartupContent id={id} />;
};

const StartupContent = async ({ id }: { id: string }) => {
    const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
    if (!post) return notFound();

    const parsedContent = DOMPurify.sanitize(md.render(post.pitch || ""));

    return (
        <>
            <section className="pink_container min-h-[230px]!">
                <p className="tag">{formatDate(post?._createdAt)}</p>

                <h1 className="heading">{post.title}</h1>
                <p className="sub-heading max-w-5xl!">{post.description}</p>

            </section>

            <section className="section_container">
                {post.image ? (
                    <Image
                        src={post.image}
                        alt={post.title}
                        width={1200}
                        height={630}
                        sizes="100vw"
                        className="w-full h-auto rounded-xl"
                    />
                ) : (
                    <div className="w-full h-[630px] rounded-xl bg-black-100" />
                )}

                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        {post.author ? (
                            <Link
                                href={`/user/${post.author._id}`}
                                className="flex gap-2 items-center mb-3"
                            >
                                {post.author.image ? (
                                    <Image
                                        src={post.author.image}
                                        alt={`${post.author.name} avatar`}
                                        width={64}
                                        height={64}
                                        className="rounded-full drop-shadow-lg"
                                    />
                                ) : (
                                    <div className="size-16 rounded-full bg-black-100 drop-shadow-lg" />
                                )}

                                <div>
                                    <p className="text-20-medium">{post.author.name}</p>
                                    <p className="text-16-medium text-black-300!">
                                        @{post.author.username}
                                    </p>
                                </div>
                            </Link>
                        ) : (
                            <div className="flex gap-2 items-center mb-3">
                                <div className="size-16 rounded-full bg-black-100" />
                                <div>
                                    <p className="text-20-medium">Unknown</p>
                                    <p className="text-16-medium text-black-300!">
                                        @unknown
                                    </p>
                                </div>
                            </div>
                        )}

                        <p className="category-tag">{post.category}</p>
                    </div>

                    <h3 className="text-30-bold">Pitch Details</h3>
                    {parsedContent ? (
                        // biome-ignore lint/security/noDangerouslySetInnerHtml: markdown output is sanitized (DOMPurify) and markdown-it HTML is disabled
                        <article
                            className="prose max-w-4xl font-work-sans break-all"
                            dangerouslySetInnerHTML={{ __html: parsedContent }}
                        />
                    ) : (
                        <p className="no-result">No details provided</p>
                    )}
                </div>

                <hr className="divider" />

                {/*TODO: EDITOR SELECTED STARTUPS*/}

                <ViewTracker id={id} />
                <Suspense fallback={<Skeleton className="view_skeleton" />}>
                    <View id={id} />
                </Suspense>
            </section>
        </>
    );
};

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    return (
        <Suspense fallback={
            <div className="min-h-screen">
                <Skeleton className="h-[230px] w-full" />
                <Skeleton className="h-96 w-full mt-10" />
            </div>
        }>
            <StartupRoute params={params} />
        </Suspense>
    );
};

export default Page;
