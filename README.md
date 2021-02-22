# README

# Project: JavaScript - To-Do List

This is my student solution to The Odin Project's [todo list project](https://www.theodinproject.com/lessons/todo-list). The goal of this project was to build a to-do list web app using only JavaScript to build and manage the DOM elements. This project combines a bit of all the lessons learned up to this point in The Odin Project's JavaScript path, including extracting modules, building objects with Classes, saving data to localStorage, and heavy DOM manipulation.

## Project Post-Mortem

This project reminded me most of working on The Odin Project's [Library App](https://github.com/jwern/library-app), primarily because of the need to build forms, extract form data through JavaScript, and then use that data to populate the individual project (or card) objects. Unlike the Library App, which I began writing in JavaScript and left HTML and DOM visibility to later, I chose to hard-code the HTML for the To-Do List first so I could see exactly what structure I wanted to work towards. This led to a much greater focus on building out the DOM elements initially and leaving the actual Project object creation to later.

## Challenges

The DOM-focused direction mentioned in the Post-Mortem above turned out to be a mistake -- or, at least, not the ideal approach to building this specific app. Because I spent so much time on the functions in the _buildProject_ module -- which are those that construct the DOM, versus those in _storeProject_ which write and edit the object data -- I ended up prioritizing DOM elements over data. This resulted in a lot of the object contructions or data updates being triggered by the DOM-building functions, i.e.: when we create a new task `<li>`, write that task to the _projectList_. I'd prefer these steps be reversed -- create the data, then the DOM element -- or, even better, unconnected completely and merely called by the same event.

## Screenshots

![Desktop view screenshot](/screenshots/todo_list_desktop_screenshot.png)
![Mobile view screenshot](/screenshots/todo_list_mobile_screenshot.png)

## To Do

Ideally, a lot of the _buildProject_ and _storeProject_ functions would be rewritten with the data prioritized and used as the primary argument in most cases, and the DOM elements being built based off that data. Realistically, this would be too time-consuming for a learning project that likely won't be updated or maintained much beyond this point.

I used a few `confirm()` methods for deletion checks and would prefer these were separate hand-built elements, but they were an easy time-save that allowed me to focus on more important areas.

I'd like to make a few small stylistic changes, like adjusting the dropdown arrow on the Task Priority form, styling the task description text to differentiate the items more, and making the description a textarea instead of just text. I'd also like to allow the "To-Do List" header to be updated to whatever name a user would like. These are all changes that are definitely doable, but were excluded for the sake of time.

## Technologies

This to-do list was built with HTML, SCSS, and JavaScript. It uses npm for library management and webpack for bundling modules and compiling SCSS to CSS. While its dependencies include [FlexMasonry](https://flexmasonry.now.sh/), the current layout is CSS grid only and does not utilize the masonry layout. The color scheme was built in [Colorate](https://colorate.azurewebsites.net/). The heading fonts are [Signika Negative](https://fonts.google.com/specimen/Signika+Negative) and the body font is [Source Sans Pro](https://fonts.google.com/specimen/Source+Sans+Pro), both from [Google Fonts](https://fonts.google.com/).
