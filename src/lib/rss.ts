import fs from "fs";
import {Feed, FeedOptions} from "feed"
import { IBlogPostBase } from "./types";

export default async function generateRSS(allPosts: IBlogPostBase[]){
     const site_url = process.env.NODE_ENV==="production" ? "https://arsentech-blog.vercel.app" : "http://localhost:3000"
     const feedOptions: FeedOptions = {
          id: site_url,
          title: "ArsenTech Blog",
          description: "Learn about cybersecurity, tech tutorials, unique coding projects, and other tech-related posts all in one place.",
          generator: "Feed for Node.js",
          language: "en",
          link: site_url,
          image: `${site_url}/app-icon.png`,
          favicon: `${site_url}/favicon.ico`,
          copyright: `All rights reserved ${new Date().getFullYear()}, ArsenTech`,
          category: "Tech",
          author: {
               name: "ArsenTech",
               link: "https://arsentech.github.io",
          },
          feedLinks: {
               rss2: `${site_url}/rss.xml`,
               json: `${site_url}/rss.json`,
               atom: `${site_url}/atom.xml`,
          },
     }
     const feed = new Feed(feedOptions)
     
     allPosts.forEach(post=>{
          feed.addItem({
               title: post.title,
               description: post.description,
               id: `${site_url}/posts/${post.slug}`,
               link: `${site_url}/posts/${post.slug}`,
               date: post.date,
               category: post.categories.map(cat=>({name: cat})),
          })
     })

     fs.writeFileSync("./public/rss.xml", feed.rss2())
     fs.writeFileSync("./public/rss.json", feed.json1())
     fs.writeFileSync("./public/atom.xml", feed.atom1())
}