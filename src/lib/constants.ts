import {SiYoutube, SiCodepen, SiGithub, SiDeviantart, SiOdysee, SiScratch, SiPatreon} from "react-icons/si"
import { IBlogPost } from "./types"

export const LINKS = [
     {name: "Home", url: "https://arsentech.github.io/#home"},
     {name: "About", url: "https://arsentech.github.io/#about"},
     {name: "Contact", url: "https://arsentech.github.io/#contact"}
]

export const SOCIAL_MEDIA_LINKS = [
     {Icon: SiYoutube, url: "https://www.youtube.com/c/ArsenTech/"},
     {Icon: SiPatreon, url: "https://www.patreon.com/ArsenTech"},
     {Icon: SiCodepen, url: "https://codepen.io/ArsenJS/"},
     {Icon: SiGithub, url: "https://github.com/ArsenTech/"},
     {Icon: SiDeviantart, url: "https://www.deviantart.com/arsen2005"},
     {Icon: SiScratch, url: "https://scratch.mit.edu/users/ArsenTech/"},
     {Icon: SiOdysee, url: "https://odysee.com/@ArsenTech"},
]

export const POSTS_PER_PAGE = 10
export const MAX_RELATED_POSTS = 5

// TODO: make blogs sample array to posts array with actual content fetched in posts folder (.md file)
export const blogs: IBlogPost[] = [
  {
    title: "Blog name 1",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quam quas laboriosam architecto error sint quod saepe sit, impedit exercitationem pariatur fugit, nisi placeat quis maiores nemo porro. Dicta, error!",
    slug: "title-1",
    tags: ["tag1", "tag2", "tag3"],
    content: "# This is a test sdfsdfsdfsdfsdgfsdsdfdsfsdfdsfdsfsdfsdf\nThis is a test post that should be written\n```js\nconsole.log(\"Hello world\")\n```\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quam quas laboriosam architecto error sint quod saepe sit, impedit exercitationem pariatur fugit, nisi placeat quis maiores nemo porro. Dicta, error!",
    date: new Date()
  },
  {
    title: "Blog name 2",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quam quas laboriosam architecto error sint quod saepe sit, impedit exercitationem pariatur fugit, nisi placeat quis maiores nemo porro. Dicta, error!",
    slug: "title-2",
    tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
    content: "# This is a test\nThis is a test post that should be written\n```js\nconsole.log(\"Hello world\")",
    date: new Date()
  },
  {
    title: "Blog name 3",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quam quas laboriosam architecto error sint quod saepe sit, impedit exercitationem pariatur fugit, nisi placeat quis maiores nemo porro. Dicta, error!",
    slug: "title-3",
    tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
    content: "# This is a test\nThis is a test post that should be written\n```js\nconsole.log(\"Hello world\")",
    date: new Date()
  },
  {
    title: "Blog name 4",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quam quas laboriosam architecto error sint quod saepe sit, impedit exercitationem pariatur fugit, nisi placeat quis maiores nemo porro. Dicta, error!",
    slug: "title-4",
    tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
    content: "# This is a test\nThis is a test post that should be written\n```js\nconsole.log(\"Hello world\")",
    date: new Date()
  },
  {
    title: "Blog name 5",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quam quas laboriosam architecto error sint quod saepe sit, impedit exercitationem pariatur fugit, nisi placeat quis maiores nemo porro. Dicta, error!",
    slug: "title-5",
    tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
    content: "# This is a test\nThis is a test post that should be written\n```js\nconsole.log(\"Hello world\")",
    date: new Date()
  },
  {
    title: "Blog name 6",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quam quas laboriosam architecto error sint quod saepe sit, impedit exercitationem pariatur fugit, nisi placeat quis maiores nemo porro. Dicta, error!",
    slug: "title-6",
    tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
    content: "# This is a test\nThis is a test post that should be written\n```js\nconsole.log(\"Hello world\")",
    date: new Date()
  },
  {
    title: "Blog name 7",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quam quas laboriosam architecto error sint quod saepe sit, impedit exercitationem pariatur fugit, nisi placeat quis maiores nemo porro. Dicta, error!",
    slug: "title-7",
    tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
    content: "# This is a test\nThis is a test post that should be written\n```js\nconsole.log(\"Hello world\")",
    date: new Date()
  },
  {
    title: "Blog name 8",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quam quas laboriosam architecto error sint quod saepe sit, impedit exercitationem pariatur fugit, nisi placeat quis maiores nemo porro. Dicta, error!",
    slug: "title-8",
    tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
    content: "# This is a test\nThis is a test post that should be written\n```js\nconsole.log(\"Hello world\")",
    date: new Date()
  },
  {
    title: "Blog name 9",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quam quas laboriosam architecto error sint quod saepe sit, impedit exercitationem pariatur fugit, nisi placeat quis maiores nemo porro. Dicta, error!",
    slug: "title-9",
    tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
    content: "# This is a test\nThis is a test post that should be written\n```js\nconsole.log(\"Hello world\")",
    date: new Date()
  },
  {
    title: "Blog name 10",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quam quas laboriosam architecto error sint quod saepe sit, impedit exercitationem pariatur fugit, nisi placeat quis maiores nemo porro. Dicta, error!",
    slug: "title-10",
    tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
    content: "# This is a test\nThis is a test post that should be written\n```js\nconsole.log(\"Hello world\")",
    date: new Date()
  },
  {
    title: "Blog name 11",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quam quas laboriosam architecto error sint quod saepe sit, impedit exercitationem pariatur fugit, nisi placeat quis maiores nemo porro. Dicta, error!",
    slug: "title-11",
    tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
    content: "# This is a test\nThis is a test post that should be written\n```js\nconsole.log(\"Hello world\")",
    date: new Date()
  },
  {
    title: "Blog name 12",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus quam quas laboriosam architecto error sint quod saepe sit, impedit exercitationem pariatur fugit, nisi placeat quis maiores nemo porro. Dicta, error!",
    slug: "title-12",
    tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
    content: "# This is a test\nThis is a test post that should be written\n```js\nconsole.log(\"Hello world\")",
    date: new Date()
  },
]