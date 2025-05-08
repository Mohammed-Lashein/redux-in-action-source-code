# Chapter notes

## Note 1
Why on every component they are importing `React` even though we are not explicitly using it ?  

=> Maybe in the book source code, they were not using babel . We can instruct babel [to auto import `React` when it needs it in compilation,](https://babeljs.io/docs/babel-preset-react#options) so that we don't need to import it on every component . 