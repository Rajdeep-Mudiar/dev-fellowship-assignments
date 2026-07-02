# React Basics

## Lec 1

React is a Javascript library for building web and mobile user interfaces .
It is a library not a framework.

### Diff between framework and library

Framework tries to handle everything we need when building an app
React(library) focuses on doing one specific thing very well

- React doesn't handle routing or manage complex logics
- React has a massive ecosystem of other libraries . We just need to plug in the right tools when necessary
- React has a component based architecture i.e, it can break UI into small, reusable pieces ,which can be composed to make more complex UIs
- React is declarative
- React can be integrated into any of our applications i.e, a portion of our page , a complete page , or even an entire application
- We can use React to build mobile applications with React Native

## Lec 2

### Setup

npm create vite@latest
Select a framework --> React
Select variant --> Javascript + React compiler
Use rolldown vite --> No
Install with npm and start now? --> Yes

## Lec 3

To download the latest version of react nd react-dom dependencies and devDependencies
npm install react@latest react-dom@latest @types/react@latest @types/react-dom@latest

### Project Structure

1. package.json --> tools and libraries we used to build react app

- scripts --> shortcuts for common tasks
  - dev --> starts production server
  - build -->creates a version of our application ready for production
  - preview --> lets us the test the build version locally
  - lint --> which runs a tool called eslint . eslint is a tool that detects common mistakes and suggests to write better codes

2. vite.config.js --> to configure vite

3. eslint.config.js --> it tells eslint what rules to follow and checking our codes for mistakes

4. index.html --> single page application

5. package-lock.json --> ensures everyone gets the same version of our dependencies

6. public folder --> it contains the static data i.e, those data that vite doesn't need to process

7. App.jsx --> contains the main application component

8. main.jsx --> contains the main application

When we run npm run dev the index.html file is run then it redirects internally to main.jsx then into the App.jsx

## Lec 4

A component is a piece of the UI that has its own logic and appearance . It can be as small as a button or the entire page
A component is just a Javascript function that return some HTML describing what should appear on screen .

React component first letter should be Upperletter
Component filename should be PascalCase or kebab case i.e, UserProfile.jsx or user-profile.jsx

## Lec 6

### JSX

JSX is a syntax extension for JavaScript that lets us write markup that looks similar to HTML,but with the full power of JavaScript behind it.

when we save our file
JSX --> transpiler --> createElement()

### createElement()

createElement() method needs atleast 3 arguments
1.The HTML element to be rendered (as a string)
2.Any properties/attributes for that element(or null if there isn't any)
3.The children of that element

## Lec 7 --> Rules of JSX

<React.Fragment> </React.Fragment> or <> </>

JSX isn't real HTML. it's JS in disguise . Since it's not HTML , it has its own set of rules we need to follow
Rules of JSX are

- Every component must return a single root element . We can't return multiple elements sitting side by side. They need to be wrapped in a parent container

- Every single tag must be properly closed . Even the ones that do not need closing tags in HTML

- Attribute names must be written in camelCase . Since JSX is an extension of JS, HTML attributes that conflict with JS keywords need different names and since attributes written in JSX become keys of JS objects , they need to be valid JS variable names.

- We can embed JS expressions directly in our markup using curly braces

### JSX Rules Takeaway

JSX rules exist because JSX is JS, not HTML

- single root element? That's how JS returns work
- self-closing tags? That's XML syntax
- camelCase attributes? That's avoiding JS reserved words
- curly braces? That's your gateway to all of JavaScript's power
