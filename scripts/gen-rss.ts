import { Feed } from "feed"
import fs from "fs"
import path from "path"
import { getAllPosts } from "@/lib/helpers"
import { absoluteURL } from "@/lib/helpers/seo"

const SITE_URL = "https://arsentech-blog.vercel.app"

const generateRSS = async() => {
     const feed = new Feed({
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
     })

     const posts = await getAllPosts()

     posts.forEach(post => {
          feed.addItem({
               title: post.title,
               description: post.description,
               id: absoluteURL(`/posts/${post.slug}`),
               link: absoluteURL(`/posts/${post.slug}`),
               date: post.date,
               category: post.categories.map(cat=>({name: cat})),
               author: [
                    {
                         name: post.author.name,
                         link: post.author.url
                    },
                    {
                         name: "ArsenTech",
                         link: "https://arsentech.github.io",
                    }
               ]
          })
     })

     const publicDir = path.join(process.cwd(), "public")
     if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir)
     }

     fs.writeFileSync(path.join(publicDir, "rss.xml"), feed.rss2())
     fs.writeFileSync(path.join(publicDir, "rss.json"), feed.json1())
     fs.writeFileSync(path.join(publicDir, "atom.xml"), feed.atom1())

     console.log("✅ RSS feeds generated.")
}
generateRSS()