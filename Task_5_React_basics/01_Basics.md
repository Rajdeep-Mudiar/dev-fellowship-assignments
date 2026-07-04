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

## Lec 8 --> Props

Props is short for properties . Props are the way components talk to each other

A parent component can pass data down to its children through props

Eg:
function Greet(name){
return <h1>Hello, {props.name} </h1>
}

## Lec 9 --> Props Pattern

1. Default Props
   - The default value is only used if the prop is missing or if we pass undefined
   - If we pull null or 0, the default value won't be used

2. Forwarding props with spread operator

3. Passing JSX as children
   - In HTML, we know that it is natural to nest elements inside each other
   - In React , we can do the exact same thing with components

## Lec 10 --> Conditional Rendering

Conditional Rendering is how we make our components show different content based on the different conditions
Eg:

- show a login button if the user isn't logged in
- show their profile if they are logged in
- show an error message only when there's an error

### 4 ways of conditional rendering

1. if statements --> Great for completely different renders or returning null
2. Ternary operator(?:) --> Perfect for either/or situations
3. AND operator(&&) --> Ideal for show/hide scenarios
4. Variables --> Best for complex logic that would make your JSX messy
5. Activity Component(React 19.2)

## Lec 11 --> Rendering Lists

A common scenario when building web applications is to display a list of items

- a list of products in an e-commerce app
- courses in a learning platform
- comments on a blog posts

To render a list of items in React, we need to take our data, put it in an array, and then transform that array into the HTML we need

## Lec 12 --> Lists and Keys

When we render a list of elements , we need to add a key prop to each element with a unique value within the list

- If our data comes from a database, we can use the database keys/IDs, which are unique by nature .
- If our data is created and persisted locally, use an incrementing counter , crypto.randomUUID() or a package like uuid

### Rules of keys

1. The key prop goes on the outermost repeated element
2. key is a special prop that React uses internally. It's not a prop that we pass to a child component and destructure there to get access to it

### Why does React need keys?

Keys are used by React to track the items in the list . They're crucial for React to efficiently update the UI

### Key Summary

key is a prop that React uses internally to track items in the list . It needs to be unique within the list . The key prop goes on the outermost repeated element . Keys are crucial for React to efficiently update the UI

## Lec 13 --> Index as Key Anti-Pattern

### Using item index as key

It's look clean , it's simple , and it makes that warning go away . But there's a reason this is considered an anti-pattern

The problem with using index as a key is that the index represents the position and not the item itself . That can lead to subtle and confusing bugs when the order of the items changes in the list

### When is it actually safe to use index as a key?

1. Our items don't have a unique ID(if they do,always use that instead)
2. The list is completely static - we never add or remove items
3. The list is never recorded or filtered

Ex: Navigation menu links

If we ever see weird behaviour in our lists - like data jumping between items, inputs losing focus, or animations glitching - check your keys first

## Lec 14 --> Styling React Components

There are tons of CSS libraries out there
Ex: Tailwind, styled components , emotion etc

3 different ways to style components

1. Inline Styles --> We don't write inline styles as a string . Instead , we use a JavaScript object . refer Alert.jsx
2. External CSS files --> The classic way we've been styling websites for years . refer ExternalCSS.jsx, ExternalCSS.css
3. CSS Modules --> CSS Modules give us the best of both worlds --> refer CssModules.jsx,Css.module.css
   - separate CSS files
   - but with locally scoped classes

## Lec 15 --> Event Handling

How can we make React components respond to

- clicks
- hovers
- keyboard input
- other ways users interact with our apps

Responding to events in React is a simple 2 step process

1. We define a function that should be executed when the event occurs
2. We assign the function to a special prop that with on

React supports all the events from regular JS

- onChange for Inputs
- onSubmit for forms
- onMouseEnter for hovering
- etc

Summary

- Handling events in React is all about passing functions to special props like onClick
- Remember to pass the function , not call it
- Use the event object when you need info about the event
- Event handlers have access to all the component's variables and props since they're defined inside the component

## Lec 16 --> Event Handlers as Props

ActionButton.jsx , Contact.jsx , Newsletter.jsx , MenuItem.jsx , Menu.jsx

For parent-to-child communication , we use props
For child-to-parent communication , we also use props
But this time, we pass event handlers as props

Summary
When we need a child component to communicate with its parent, we pass event handlers as props
The child says something happened and the parent decides what to do about it
We will use it every time we build a reusable component that needs different behaviours in different places

## Lec 17 --> Introduction to State

Counter.jsx

1. Changing variables doesn't make React update the screen(no re-render)
2. Variables reset every time the component renderes (no persistance)

This is where state comes in

### State

State is a component's memory . It is special data that:

1. Triggers a re-render when it changes (solving our screen update problem)
2. Persists between renderes (solving our reset problem)

It is used in :

- Shopping carts that show how many items we have added
- Forms that display what we re typing
- Modals that open and close
- Theme switchers that toggle between light and dark mode

None of these would work with regular variables . They all need state

### Props vs state

#### Props

1. Props are like arguments passed to a function
2. It come from outside and we can't change them

#### State

1. State is like the component's personal memory
2. It belongs to the component and the component can change it
3. State is what makes React components truly interactive . Without state , we're basically just creating fancy HTML templates
4. With state , we can build real applications

### When do we need State

- Does this data need to change over time ?
- Should the UI update when this data changes?
- Does the component need to "remember" this between renders?

If we answered yes to any of these , we need state

### Hooks

React makes adding state to components super easy with something called hooks .
Hooks are special functions that let us "hook into" React features.
And the most important hook for managing state is called useState

## Lec 18 --> useState Hook

Counter.jsx , LoginCard.jsx

### useState Hook

When we call setCount

1. React updates the state value
2. React re-renders the component
3. useState gives us the new value
4. our UI shows the updated count

### useState - lazy initialisation

It is useful when we have any expensive computation we need to do to calculate the initial state

- reading from local storage
- fetching data from an API
- doing any other heavy computation

### Summary

- To add state to a component , import useState from React and call it with an initial value
- We can also pass a function to useState for lazy initialization
- It returns an array with 2 items: [currentValue,setterFunction]
- Use array destructuring to name them
- Use the state value in our JSX
- Call the setter function to update state and trigger a re-render
- We can have multiple state variables , each managing its own data
- Multiple instances of a component each have their own local state

## Lec 19 --> Rules of Hooks

UserDashboard.jsx

### 2 goldern Rules of Hooks

1. Only call hooks at the top level of our function .
   - Not inside loops
   - Not inside conditions
   - Not inside nested functions
   - not in try/catch blocks

2. Only call hooks from React functions i.e,
   - from React component
   - or from custom hooks

## Lec 20 --> How State Updates Work

SimpleCounter.jsx

### How state updates work

Updating the UI is a 3-phase process:

- the trigger phase
- the render phase
- the commit phase

### 1. The trigger phase

This happens the moment we call a state setter function like setCount()
We're not updating the UI yet

### 2. Render phase

React calls our component function again
React figures out which parts of the UI, if any need to be updated
Re-running the function doesn't immediately change what's on screen

### 3. Commit Phase

React takes the changes it calculated during the render phase and applies them to the DOM

### How setCOunt update works

1. We call setCount(count + 1) (trigger phase)
2. React marks our component as needing an update (trigger phase)
3. React calls our component function again (render phase)
4. Our function returns new JSX with the updated count (render phase)
5. React compares this render with the previous one and figures out what changed (render phase)
6. React updates only what changed in the actual DOM (commit phase)
