import { defineField } from "sanity";

const user = {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    defineField({
      name: "isAdmin",
      title: "Is Admin",
      type: "boolean",
      description: "Check if user is admin",
      initialValue: false,
      validation: (Rule) => Rule.required(),
      // readOnly: true,
      // hidden: true,
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "name of the user",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "url",
    }),

    defineField({
      name: "password",
      type: "string",
      hidden: true,
    }),

    defineField({
      name: "emailVerified",
      type: "datetime",
      hidden: true,
    }),

    defineField({
      name: "email",
      type: "string",
      title: "Email",
    }),

    defineField({
      name: "about",
      title: "About",
      type: "text",
      description: "A brief des about user",
    }),
  ],
};

export default user;
