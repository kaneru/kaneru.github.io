---
layout: post
title:  "Separate the Octopress blog into two different repos"
date:   2016-02-14 09:00:00 +0900
---
My blog is running on octopress + github pages, so at first I had in my [blog repo](https://github.com/johnnykernel/johnnykernel.github.io) two branches:

- master
- source

The source branch is a place where I make changes, edit posts, add images etc. The master branch is generated and deployed by `rake`. This branch is acting like a hosting for gh-pages.

I wanted to split the repo so I used these following commands:

```shell
git remote add blog https://github.com/johnnykernel/blog.git

git push -u blog source

git push origin --delete source
```

Thus the master branch stays in [johnnykernel.github.io repo](https://github.com/johnnykernel/johnnykernel.github.io). But the source branch moved to newly created [repo called blog](https://github.com/johnnykernel/blog.git)
