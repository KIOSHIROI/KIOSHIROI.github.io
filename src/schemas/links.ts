import { z } from 'astro/zod'

export const FriendLinksSchema = () =>
  z
    .object({
      logbook: z.array(
        z.object({
          date: z.string(),
          content: z.string()
        })
      ),
      applyTip: z.array(
        z.object({
          name: z.string(),
          val: z.string()
        })
      )
    })
    .default({
      logbook: [],
      applyTip: [
        { name: 'Name', val: 'Astro Axi' },
        { name: 'Desc', val: 'Null' },
        { name: 'Link', val: 'https://axi404.top/' },
        { name: 'Avatar', val: 'https://axi404.top/avatar/avatar.webp' }
      ]
    })
    .describe('Friend links for your website.')
