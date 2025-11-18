// Imports the SearchForm and StartupCard components.
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import type { StartupTypeCard } from "@/lib/types";

// Defines the Home page as an async component to handle awaited search parameters.
export default async function Home({
  searchParams,
}: {
  // Defines the type for searchParams, which is a promise resolving to a query object.
  searchParams: Promise<{ query?: string }>;
}) {
  // Awaits the resolution of searchParams to get the current search query.
  const query = (await searchParams).query;
  // Defines a mock array of posts to simulate data fetching.
  const posts = [{
    _createdAt: new Date(),
    views: 55,
    author: {_id: 1, name: 'John Doe'},
    _id: 1,
    description: 'This is a description',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1640&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Technology',
    title: 'We <3 robots',
  }]
 
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