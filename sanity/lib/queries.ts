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
export const STARTUP_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, username, image, bio
  }, 
  views,
  description,
  category,
  image,
  pitch,
}`);

