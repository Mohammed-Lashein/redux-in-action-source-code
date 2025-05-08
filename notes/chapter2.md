# Chapter notes

## Note 1

Why on every component they are importing `React` even though we are not explicitly using it ?

=> Maybe in the book source code, they were not using babel . We can instruct babel [to auto import `React` when it needs it in compilation,](https://babeljs.io/docs/babel-preset-react#options) so that we don't need to import it on every component .

## Note 2

Why am I using css classes even though I am using tailwind ?
=> I may use tailwind only, however in the meantime I will not bother refactoring the provided code in the book, so I am going to use a dedicated css file that will include tailwind styles for each component .

This approach may scale with me so that I also include the unit tests of each component in its dir .
