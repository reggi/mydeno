import { serve } from "https://deno.land/std@0.182.0/http/server.ts";
import { router } from 'https://crux.land/router@0.0.12'
import { anchorArbor } from "./anchor_arbor.tsx";
import images from 'https://gist.githubusercontent.com/reggi/5cb4d3223460fc33e1d53f83124f73a5/raw/2b629d4509574faa94557791d1ce98dc5b7890ec/images.json' assert { type: 'json' }

await serve(router({
  '/links': anchorArbor({ 
    topImage: images.profile,
    description: "Thomas's Links",
    title: "Thomas Reggi's Links Page",
    keywords: "Personal Website, JavaScript Coder, TypeScript Coder",
    author: "Thomas Reggi",
    tailwindTheme: {
      "body": "bg-[#010522] container mx-auto max-w-screen-md py-10 px-10 text-white",
      ".topImage": "mx-auto rounded-full mb-5",
      ".summary": "mb-5",
      ".markdown p": "pb-3",
      ".markdown a": "text-red-300 hover:text-red-200",
      ".link": "relative block hover:bg-white hover:text-black rounded-full border-2 text-center p-5 mb-3 md:mb-5",
      ".linkImage": "absolute rounded-full w-[50px] top-[7px] left-[10px]",
      ".footer": "text-center"
    },
    summary: [
      `Hi, I'm Thomas Reggi (he/they) 👋. I'm a software engineer and artist based in Astoria, Queens 🗽. I'm passionate about coding and using technology as a form of expression 🖌. Outside of work, I enjoy practicing yoga, meditation, and learning about spirituality and Buddhism 🪷. I aspire to continue growing as an engineer and hope to create something that will make a positive impact in the world. I believe in socialist values 💪, where companies can have better structures and employees come first 🚫🏢.`,
      `Currently open to new roles Software Engineering roles 💻`,
      `More about what I'm looking for can be found here: [job.reggi.com](/job)`,
    ].join('\n\n'),
    links: {
      'Mastodon on indieweb.social': {
        href: "https://indieweb.social/@thomasreggi",
        image: images['mastodon.png']
      },
      "Daily Brushwork": {
        href: "https://brush.reggi.com/",
        image: images['brush.jpg']
      },
      "Art Collection": "https://art.reggi.com/",
      "Tech Blog on dev.to": {
        href: "https://dev.to/reggi",
        image: images['devto.png']
      },
      "Personal Substack": {
        href: "https://reggi.substack.com/",
        image: images['substack.png']
      },
      "lofi.supply (Side Project)": "https://lofi.supply/",
      "LinkedIn": {
        href: "https://linkedin.com/in/thomasreggi",
        image: images['linkedin.png']
      },
      "Github Profile": {
        href: "https://github.com/reggi",
        image: images['github.png']
      },
      "StackOverflow Profile": {
        href: "https://stackoverflow.com/users/340688/thomasreggi",
        image: images['stackoverflow.png']
      },
      "Youtube Channel": "https://www.youtube.com/c/thomasreggi",
      "Instagram": "https://www.instagram.com/thomasreggi",
      "Twitter": "https://twitter.com/thomasreggi"
    },
    footer: [
      'Created using [Deno](https://deno.land/) & Hosted on Deno Deploy [Playground](https://dash.deno.com/playground/anchor-arbor).',
      "[Deno module](https://deno.land/x/reggi@0.0.5/static_sites/anchor_arbor.tsx) | [Source Code](https://github.com/reggi/mydeno/blob/main/static_sites/anchor_arbor.tsx)",
    ].join('\n\n')
  })
}));
