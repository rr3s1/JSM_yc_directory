import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY }  from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { cache } from "react";
import { Suspense } from "react";

// Cache the auth call to avoid redundant requests in this scope
const getCachedSession = cache(auth);

const HomeContent = async ({ query }: { query?: string }) => {
  const params = { search: query || null };

  const session = await auth();

  // Log the Sanity ID to verify the auth flow is working
  console.log(session?.id);

  await getCachedSession();

  // Fetch startups with live updates enabled
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
      <>
        <section className="pink_container">
          <h1 className="heading">
            Pitch Your Startup, <br />
            Connect With Entrepreneurs
          </h1>

          <p className="sub-heading max-w-3xl!">
            Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
            Competitions.
          </p>

          <SearchForm query={query} />
        </section>

        <section className="section_container">
          <p className="text-30-semibold">
            {query ? `Search results for "${query}"` : "All Startups"}
          </p>

          <ul className="mt-7 card_grid">
            {posts?.length > 0 ? (
                posts.map((post: StartupTypeCard) => (
                    <StartupCard key={post?._id} post={post} />
                ))
            ) : (
                <p className="no-results">No startups found</p>
            )}
          </ul>
        </section>

        <SanityLive />
      </>
  );
};

// Wrapper component to handle search params properly
const HomeRoute = async ({
                           searchParams,
                         }: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const { query } = await searchParams;
  return <HomeContent query={query} />;
};

export default function Home({
                               searchParams,
                             }: {
  searchParams: Promise<{ query?: string }>;
}) {
  return (
      <Suspense
          fallback={
            <div className="min-h-screen">
              <Skeleton className="h-[230px] w-full" />
              <Skeleton className="h-96 w-full mt-10" />
            </div>
          }
      >
        <HomeRoute searchParams={searchParams} />
      </Suspense>
  );
}