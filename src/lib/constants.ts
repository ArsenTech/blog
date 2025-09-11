import {SiYoutube, SiCodepen, SiGithub, SiDeviantart, SiOdysee, SiScratch, SiPatreon} from "react-icons/si"

export const LINKS = [
     {name: "Home", url: "https://arsentech.github.io/#home"},
     {name: "About", url: "https://arsentech.github.io/#about"},
     {name: "Contact", url: "https://arsentech.github.io/#contact"}
]
export const SOCIAL_MEDIA_LINKS = [
     {Icon: SiYoutube, url: "https://www.youtube.com/c/ArsenTech/"},
     {Icon: SiPatreon, url: "https://www.patreon.com/ArsenTech"},
     {Icon: SiCodepen, url: "https://codepen.io/ArsenTech/"},
     {Icon: SiGithub, url: "https://github.com/ArsenTech/"},
     {Icon: SiDeviantart, url: "https://www.deviantart.com/arsen2005"},
     {Icon: SiScratch, url: "https://scratch.mit.edu/users/ArsenTech/"},
     {Icon: SiOdysee, url: "https://odysee.com/@ArsenTech"},
]

export const POSTS_PER_PAGE = 10
export const POSTS_IN_SEARCH = 5
export const MAX_RELATED_POSTS = 3
export const MAX_FEATURED_POSTS = 5
export const SITE_URL = process.env.NODE_ENV==="production" ? "https://arsentech-blog.vercel.app" : "http://localhost:3000"