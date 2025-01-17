import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
    collections: {
        things: defineCollection({
            source: 'things/*.md',
            type: "page",
            schema: z.object({
                title: z.string(),
                description: z.string(),
                image: z.string(),
                date: z.string().date()
            })
        })
    }
})