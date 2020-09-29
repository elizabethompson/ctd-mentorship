# Front End 1: Week 5-6 Assignment Tutorial

> Based on the front-end 1 week 5-6 [assignment instructions](https://github.com/Code-the-Dream-School/Front-End-1-Week-6-Assignment/blob/master/README.md)

## Preface

In this tutorial, all examples of arrow functions can be substituted for regular functions.

```js
// Example:
const fetchStudents = () => { ... }

// Alternative:
function fetchStudents() { ... }
```

```js
// Example:
formElement.addEventListener('submit', (event) => { ... })

// Alternative:
formElement.addEventListener('submit', function(event) { ... })
```

> Refresher on arrow functions

## Requirements

1. [Fetch student and course data](#step-1-fetch-student-and-course-data)
2. [Store data in local application state](#step-2-store-data-in-local-application-state)
3. [Render student data list in "Students" card layout](#step-3-render-student-data-list-in-"students"-card-layout)
4. [Render course data list in "Courses" card layout](#step-4-render-course-data-list-in-"courses"-card-layout)
5. [Create "New Student" form](#step-5-create-"new-student"-form)

## Step 1: Fetch student and course data

There are two data sources for this application that can be fetched on page load, so the first step is to create an event listener (see Example 1a).

---

_Example 1a: Event listener for on page load_
```js
window.addEventListener('load', () => {
    // TODO: fetch data
})
```

Now, you can create a function for each of the API requests and invoke those functions inside the event listener (see Example 1b).

---

_Example 1b:_
```js
const fetchStudents = () => {
    // TODO: fetch and return student data
    return
}

const fetchCourses = () => {
    // TODO: fetch and return course data
    return
}

window.addEventListener('load', () => {
    const studentData = fetchStudents()
    const courseData = fetchCourses()
})
```

Within each of the functions you just created, you will need to make a request using the Fetch API and return the response (see Example 1c).

---

_Example 1c:_
```js
const fetchStudents = () => {
    return fetch('https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Students.json')
        .then((res) => res.json())
        .catch((error) => {
            console.error(error.message)
        })
}

const fetchCourses = () => {
    return fetch('https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Courses.json')
        .then((res) => res.json())
        .catch((error) => {
            console.error(error.message)
        })
}

window.addEventListener('load', () => {
    const studentData = fetchStudents()
    const courseData = fetchCourses()
})
```

Not done yet! The code in Example 3 is missing two crucial keywords: async and await. Since the Fetch API is asynchronous, the `fetch()` function returns a `Promise` so you have to use either callbacks or await/async to wait for the Promise to resolve (see Example 1d).

---

_Example 1d:_
```js
// this function is asynchronous because it returns a Promise
const fetchStudents = async () => {
    return fetch('https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Students.json')
        .then((res) => res.json())
        .catch((error) => {
            console.error(error.message)
        })
}

// this function is asynchronous because it returns a Promise
const fetchCourses = async () => {
    return fetch('https://code-the-dream-school.github.io/JSONStudentsApp.github.io/Courses.json')
        .then((res) => res.json())
        .catch((error) => {
            console.error(error.message)
        })
}

// this function is asynchronous because it uses the await keyword
window.addEventListener('load', async () => {
    const studentData = await fetchStudents() // wait on the Promise to resolve; then, go to next line...
    const courseData = await fetchCourses() // wait on the Promise to resolve
})
```

**(Optional)** Unlike in the previous assignment, the two API requests you are making do not depend on each other which means that the requests can run asynchronously. This is best practice in terms of performance and optimization because it allows the script to finish executing in less time (see Example 1e).

---

_Example 1e: Using `Promise.all()` to resolve two API requests asynchronously_
```js
window.addEventListener('load', () => {
    Promise.all([fetchStudents(), fetchCourses()])
        .then(([students, courses]) => {
            console.log(students)
            console.log(courses)
        })
        .catch((error) => {
            console.error(error.message)
        })
})
```


## Step 2: Store data in local application state

Since you will be making client-side updates to the student and course data, you will need to declare some variables to store data in the application's "state" (see Example 2a).

---

_Example 2a:_
```js
// Option 1: Individual global variables
let students = []
let courses = []

// Option 2: Global state object (better for scope safety)
const state = {
    students: [],
    courses: [],
}
```

Once you've declared your state variable(s), you will need to define the values using the API data you fetched (see Example 2b).

---

_Example 2b:_
```js
window.addEventListener('load', async () => {
    const studentData = await fetchStudents()
    const courseData = await fetchCourses()

    state.students = studentData
    state.courses = courseData
})
```


## Step 3: Render student data list in "Students" card layout

Now that you have fetched and stored the student data, you can render the data as a list of cards in the "Students" view.

Begin by selecting the "Students" button and creating a click event listener (see Example 3a).

---

_Example 3a:_
```js
const studentsButton = document.querySelector('#students')

studentsButton.addEventListener('click', () => {
    // TODO: render "Students" card layout
})
```

Next, create a reusable function for rendering the "Students" card layout and invoke it from the event listener (see Example 3b).

---

_Example 3b:_
```js
const studentsButton = document.querySelector('#students')

const renderStudentsLayout = () => {
    // TODO: render "Students" card layout
}

studentsButton.addEventListener('click', () => {
    renderStudentsLayout()
})
```

This new function will need to do two things: (1) Generate HTML content using the `.map()` method, and (2) Insert the generated HTML into the DOM content container (see Example 3c).

---

_Example 3c:_
```js
const containerElement = document.querySelector('#root') // HTML: <div id="root" class="row"></div>
const studentsButton = document.querySelector('#students')

const renderStudentsLayout = () => {
    const html = state.students.map((student) => {
        // TODO: return HTML for each student object in the array
        return
    })

    containerElement.innerHTML = html.join('') // join the array using a blank string to remove commas
}

studentsButton.addEventListener('click', () => {
    renderStudentsLayout()
})
```

Finally, craft the HTML for each student using a template literal (see Example 3d). The following content should be included:

1. Student first and last name
2. Status indicator circle
3. List of enrolled courses
4. "Add Course" button
5. "Edit Info" button

---

_Example 3d:_
```js
const containerElement = document.querySelector('#root') // HTML: <div id="root" class="row"></div>
const studentsButton = document.querySelector('#students')

const renderStudentsLayout = () => {
    const html = state.students.map((student) => {
        return `
          <div class="col-4 mb-3">
            <div class="card">
              <div class="card-body">
                <!-- TODO: add HTML card content here -->
              </div>
            </div>
          </div>
        `
    })

    containerElement.innerHTML = html.join('') // join the array using a blank string to remove commas
}

studentsButton.addEventListener('click', () => {
    renderStudentsLayout()
})
```

> More instructions coming soon...


## Step 4: Render course data list in "Courses" card layout

Now that you have fetched and stored the course data, you can render the data as a list of cards in the "Courses" view.

Repeat the process from [Step 4](#step-4-render-course-data-list-in-"courses"-card-layout) as the steps are nearly identical. 😉

The HTML content for each course should include:

1. Course name
2. Course duration
3. List of enrolled students
4. "Add Student" button

> More instructions coming soon...


## Step 5: Create "New Student" form

The "New Student" button should display a modal containing the new student form.

In your `index.html` file, create a modal component and add the modal trigger to the "New Student" button (see Example 5a). The new student form should have two required fields: (1) First name, and (2) Last name.

---

_Example 5a:_
```html
<!-- update existing button -->
<button class="btn btn-outline-info" type="button" data-toggle="modal" data-target="#newStudentModal">New Student</button>

<!-- ... -->

<!-- create new modal -->
<div class="modal fade" id="newStudentModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">New Student</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- TODO: add form here -->
      </div>
    </div>
  </div>
</div>
```

> More instructions coming soon...

<br/>

---

<br/>

<p align="center" style="text-align: center;">
  Front End 1: Week 5-6 Tutorial for <a href="https://codethedream.org">Code the Dream</a> by <a href="https://github.com/elizabethompson">@elizabethompson</a>
  <br/>
  <br/>
  <a href="#">Back to top</a>
</p>
