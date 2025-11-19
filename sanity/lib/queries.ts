import { defineQuery } from "next-sanity";

// Query for all startups (no search) - using defineQuery for type safety
export const ALL_STARTUPS_QUERY = defineQuery(
  `*[_type == "startup"] | order(_createdAt desc) {
    _id, 
    title, 
    slug,
    _createdAt,
    author -> {
      _id, name, image, bio
    }, 
    views,
    description,
    category,
    image,
  }`
);

// Query for filtered startups (with search)
export const SEARCH_STARTUPS_QUERY = defineQuery(
  `*[_type == "startup" && (title match $search || category match $search || author->name match $search)] | order(_createdAt desc) {
    _id, 
    title, 
    slug,
    _createdAt,
    author -> {
      _id, name, image, bio
    }, 
    views,
    description,
    category,
    image,
  }`
);
