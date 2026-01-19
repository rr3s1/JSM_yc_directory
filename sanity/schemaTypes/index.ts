import { type SchemaTypeDefinition } from 'sanity'
import { author } from "./author";
import { startup } from "./startup";
import {playlist} from "@/sanity/schemaTypes/playlist";


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup, playlist],
}
