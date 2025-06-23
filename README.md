# Project notes

The book uses class components, while being obsolete, I will use them because : 
1. I am working on some legacy projects that need the knowledge of class components
2. I came to learn redux not to confuse myself how to implement certain functionalities using functional components
3. The good thing about this book is that it uses **plain redux** not `redux toolkit`, so we have the opportunity to get a low level understanding of redux

# Learning notes
I will provide here the notes about new things I learnt from each chapter.

## Chapter 2 notes

### Note 1

Why on every component they are importing `React` even though we are not explicitly using it ?

=> Maybe in the book source code, they were not using babel . We can instruct babel [to auto import `React` when it needs it in compilation,](https://babeljs.io/docs/babel-preset-react#options) so that we don't need to import it on every component .

### Note 2

Why am I using css classes even though I am using tailwind ?
=> I may use tailwind only, however in the meantime I will not bother refactoring the provided code in the book, so I am going to use a dedicated css file that will include tailwind styles for each component .

This approach may scale with me so that I also include the unit tests of each component in its dir .

### Note 3 
I thought about project's modularity and wanted to create a separate styles file for each component . I decided to use tailwind `@apply` rule in the classes, but the problem is that **tailwind couldn't read those at all .**

I tried everything : 
1. Use tailwind as a postcss plugin instead of a vite plugin, then add every css file, to be matched by a regex, in the `postcss.config.mjs`
2. Download sass then import all of the sass files in an entry file, then import that entry file in `App.css` that contains `@import 'tailwindcss'`

The 2nd approach worked *partially*, because vite's HMR no longer worked on changing tailwind classes within `@apply` rule . 

So it seems that the best available solution is to write these classes within the `App.css` file where we imported tailwind . This is the most working way I could come across . 

## Chapter 3 notes