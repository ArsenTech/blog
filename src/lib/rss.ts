import fs from "fs";
import {Feed, FeedOptions} from "feed"
import { IBlogPostBase } from "./types";
import { absoluteURL } from "./helpers/seo";
import { SITE_URL } from "./constants";

export default async function generateRSS(allPosts: IBlogPostBase[]){
     const feedOptions: FeedOptions = {
          id: SITE_URL,
          title: "ArsenTech Blog",
          description: "Learn about cybersecurity, tech tutorials, unique coding projects, and other tech-related posts all in one place.",
          generator: "Feed for Node.js",
          language: "en",
          link: SITE_URL,
          image: absoluteURL("/app-icon.png"),
          favicon: absoluteURL("/favicon.ico"),
          copyright: `All rights reserved ${new Date().getFullYear()}, ArsenTech`,
          category: "Tech",
          author: {
               name: "ArsenTech",
               link: "https://arsentech.github.io",
          },
          feedLinks: {
               rss2: absoluteURL(`/rss.xml`),
               json: absoluteURL(`/rss.json`),
               atom: absoluteURL(`/atom.xml`),
          },
     }
     const feed = new Feed(feedOptions)
     
     allPosts.forEach(post=>{
          feed.addItem({
               title: post.title,
               description: post.description,
               id: absoluteURL(`/posts/${post.slug}`),
               link: absoluteURL(`/posts/${post.slug}`),
               date: post.date,
               category: post.categories.map(cat=>({name: cat})),
               author: [{
                    name: "ArsenTech",
                    link: "https://arsentech.github.io",
               }]
          })
     })

     fs.writeFileSync(new URL("../../public/rss.xml",import.meta.url), feed.rss2())
     fs.writeFileSync(new URL("../../public/rss.json",import.meta.url), feed.json1())
     fs.writeFileSync(new URL("../../public/atom.xml",import.meta.url), feed.atom1())
}