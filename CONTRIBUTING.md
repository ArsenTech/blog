<p align="center">
    <img src=".github/main-blog.png" alt="Project Logo">
</p>

<h1 align="center">Contributing Guide to ArsenTech's Blog Page</h1>

First off, thanks for considering contributing to this project! Your ideas, time, and effort help make it better for everyone. 💡

We welcome all kinds of contributions: **code**, **design**, **MDX blog posts**, **documentation**, **bug reports**, **feature ideas**, and **feedback**.  
This guide explains how you can get involved.

---

## Ways to Contribute
You don’t need to write code to make a valuable contribution! Here are some great ways:
- **Development** – Fix bugs, add features, or refactor code.
- **Testing & Bug Reports** – Try the app on different devices and report any issues.
- **Writing a Blog** – Write a tech-related post that fits the niche of this app.
- **Design & UI Feedback** – Suggest layout, accessibility, or UX improvements.
- **Feature Requests** – Share your ideas for improvements by opening a feature request.
- **Community Support** – Answer questions in issues and help others get started.

## Pull Request Guidelines
When submitting a PR:
1. Create a branch from `main`:
   ```bash
   git checkout -b <type>/<short-description>
   # examples: feature/new-feature, fix/typo, i18n/ru-russian, blog/top-coding-tools
   ```
2. Keep commits small and meaningful.
3. Ensure the app builds and passes linting/tests.
4. Update docs (README, CHANGELOG) if you changed behavior or added features.
5. Open the PR and describe what you changed and why..

### Checklist
- [ ] My changes work locally (`npm run dev`).
- [ ] I’ve updated documentation/screenshots if needed.
- [ ] I’ve tested on multiple browsers/devices.
- [ ] My commit messages are clear and signed (`git commit -s -m "your message"`).

## 📝 Commit Convention (Optional but Recommended)
We recommend following the [Conventional Commits](https://www.conventionalcommits.org/) format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `refactor:` for code improvements
- `chore:` for maintenance

Example:
```
feat: add bulk idea selection feature
```

## Development Setup
1. Fork the repository and clone your fork:
      ```bash
      git clone https://github.com/ArsenTech/blog.git
      cd blog
      ```
2. Install dependencies:
      ```bash
      npm install
      ```
3. Run the development server:
      ```bash
      npm run dev
      ```
4. Open `http://localhost:3000` in your browser.

PRs are reviewed with kindness and calmness :-)

## Testing the Blog Page
Before submitting a PR:
- Test **light and dark mode**.
- Verify **responsiveness and accessibility** on desktop, tablet, and mobile.
- Check your blog content after maintaining or adding a post.
- Ensure blog posts, new features, and improvements work correctly.
- Make sure there are **no console errors** and no **linting issues.**

## Adding Blog Posts
> [!NOTE]
> - All blog posts are stored in the `src/posts/` folder.
> - Each post has a content (e.g. `src/posts/remove-noescape.mdx` - Blog post about Removing NoEscape.exe).
> - If unsure about some parts, open a draft PR — maintainers will help!

> [!IMPORTANT]
> Make sure all blog posts are **safe, accurate, and educational** for readers and tech enthusiasts. Posts **must not** contain or promote harmful actions, exploit distribution, unsafe code execution, or unethical practices.

### Steps
1. Create a new file in `src/posts/[slug].mdx`  
   Example: `src/posts/remove-noescape.mdx` or `src/posts/top-coding-tools.mdx`
2. Write your blog content (you may use an AI helper or write manually).
3. Save the `.mdx` file.
4. Test it locally by visiting `http://localhost:3000/posts/[slug]`.
5. Review the content for grammar, clarity, and formatting.
6. Submit a **Pull Request** for review!

> [!CAUTION]
> Any post containing or encouraging **unsafe, harmful, or misleading actions** will be rejected after review. This includes promoting malware, bypassing licenses, or misusing tools.

If the blog post is accepted by a maintainer, it will be published and visible to all readers.

## Blog Post Metadata (Frontmatter)

Each .mdx file should begin with a metadata block (frontmatter):

```yaml
---
title: "How to Create a Bootable USB (and Restore It to Normal)"
description: "This guide shows how to create a bootable USB for Windows or Linux, and restore it to full capacity afterward."
date: "2025-06-03"
tags: ["usb", "rufus", "bootable", "windows", "linux"]
categories: ["Tutorial", "Bootable USB", "Windows", "Linux"]
published: true
featured: false
author: Your Username
authorURL: https://github.com/<your-username>
---
```
> [!TIP]
> - `published: false` hides a draft post until it’s ready.
> - `featured: true` highlights it in the main section.
> - Tags and categories help organize your posts.

## Feedback & Feature Requests
We love new ideas! If you have a suggestion:
1. Check [existing issues][issues-url]
2. If it’s new, open a [feature request][new-feature-request-url].
3. Clearly explain the motivation and the desired implementation.

## Community Guidelines
We aim to keep this space **welcoming, informative, and peaceful**, not spammy or confusing:
- Be respectful and constructive.
- Focus on ideas, not individuals.
- Keep discussions inclusive and on-topic.
- Remember: behind every contribution is a person.

### Dos and Don'ts
| ✅ Do                           | ❌ Don’t                 |
| ------------------------------- | ------------------------- |
| Follow branch naming convention | Edit README for no reason |
| Test before submitting          | Submit broken builds      |
| Use clear commit messages       | Spam “fix typo” PRs       |
| Respect code owner reviews      | Bypass linting            |

See our [Code of Conduct][code-of-conduct-url] for more.

## 🙌 A Note of Thanks
Contributors are what make this blog thrive.
Your time, ideas, and creativity are truly appreciated.

Take a deep breath, enjoy the process, and let’s make the blog page beautiful, interactive, and inspiring — together!

> GitHub [@ArsenTech][github-url] &nbsp;&middot;&nbsp;
> YouTube [@ArsenTech][yt-url] &nbsp;&middot;&nbsp;
> Patreon [ArsenTech][patreon-url] &nbsp;&middot;&nbsp;
> [ArsenTech's Website][website-url]

[issues-url]: https://github.com/ArsenTech/blog/issues
[new-feature-request-url]: https://github.com/ArsenTech/blog/issues/new?assignees=&labels=&template=feature_request.md&title=
[code-of-conduct-url]: https://github.com/ArsenTech/blog/blob/main/CODE_OF_CONDUCT.md
[yt-url]:https://www.youtube.com/channel/UCrtH0g6NE8tW5VIEgDySYtg
[patreon-url]:https://www.patreon.com/ArsenTech
[github-url]: https://github.com/ArsenTech
[website-url]: https://arsentech.github.io