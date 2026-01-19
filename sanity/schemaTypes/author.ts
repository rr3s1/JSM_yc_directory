import { defineField, defineType } from "sanity";
import { UserIcon } from "lucide-react";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "id",
      type: "number",
    }),
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "username",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "url",
    }),
    defineField({
      name: "bio",
      type: "text",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "username",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});
