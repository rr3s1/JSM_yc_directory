// Imports the SearchForm and StartupCard components.
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { ALL_STARTUPS_QUERY, SEARCH_STARTUPS_QUERY } from "@/sanity/lib/queries";
import {client} from "@/sanity/lib/client";

// Defines the Home page as an async component to handle awaited search parameters.
export default async function Home({
  searchParams,
}: {
  // Defines the type for searchParams, which is a promise resolving to a query object.
  searchParams: Promise<{ query?: string }>;
}) {
  // Awaits the resolution of searchParams to get the current search query.
  const query = (await searchParams).query;

  let posts: StartupTypeCard[] = [];
  try {
    if (query && query.trim()) {
      const searchParam = `*${query.trim()}*`;
      const result = await client.fetch(SEARCH_STARTUPS_QUERY, { search: searchParam });
      posts = Array.isArray(result) ? result : [];
    } else {
      const result = await client.fetch(ALL_STARTUPS_QUERY);
      posts = Array.isArray(result) ? result : [];
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

 
  return (
    <>
     <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>

      {/* Section for displaying the list of startups. */}
      <section className="section_container">
        {/* Dynamically displays a title based on whether a search query is active. */}
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        {/* Unordered list that serves as the grid for startup cards. */}
        <ul className="mt-7 card_grid">
          {/* Conditionally maps over the posts array if it is not empty. */}
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              // Renders a StartupCard for each post, passing the post data and a unique key.
              <StartupCard key={post?._id} post={post}/>
            ))
          ) : (
            // Displays a message if no startups are found.
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}