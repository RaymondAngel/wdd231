// Official certificate array: https://byui-cse.github.io/wdd231-ww-course/week01/courses.js
// Raymond confirmed all certificate courses are completed except current WDD 231.
"use strict";
const courses = [
  {
    "subject": "CSE",
    "number": 110,
    "title": "Introduction to Programming",
    "credits": 2,
    "certificate": "Web and Computer Programming",
    "description": "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    "technology": [
      "Python"
    ],
    "completed": true
  },
  {
    "subject": "WDD",
    "number": 130,
    "title": "Web Fundamentals",
    "credits": 2,
    "certificate": "Web and Computer Programming",
    "description": "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
    "technology": [
      "HTML",
      "CSS"
    ],
    "completed": true
  },
  {
    "subject": "CSE",
    "number": 111,
    "title": "Programming with Functions",
    "credits": 2,
    "certificate": "Web and Computer Programming",
    "description": "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
    "technology": [
      "Python"
    ],
    "completed": true
  },
  {
    "subject": "CSE",
    "number": 210,
    "title": "Programming with Classes",
    "credits": 2,
    "certificate": "Web and Computer Programming",
    "description": "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    "technology": [
      "C#"
    ],
    "completed": true
  },
  {
    "subject": "WDD",
    "number": 131,
    "title": "Dynamic Web Fundamentals",
    "credits": 2,
    "certificate": "Web and Computer Programming",
    "description": "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    "technology": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "completed": true
  },
  {
    "subject": "WDD",
    "number": 231,
    "title": "Frontend Web Development I",
    "credits": 2,
    "certificate": "Web and Computer Programming",
    "description": "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    "technology": [
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "completed": false
  }
];

function getCourseSelection(subject) {
  return courses.filter(course => subject === "All" || course.subject === subject);
}

function getCourseCredits(selectedCourses) {
  return selectedCourses.reduce((total, course) => total + course.credits, 0);
}

function createCourseCard(course) {
  const card = document.createElement("article");
  card.className = `course-card${course.completed ? " is-complete" : ""}`;
  const heading = document.createElement("h3");
  heading.textContent = `${course.subject} ${course.number}`;
  const title = document.createElement("p");
  title.className = "course-title";
  title.textContent = course.title;
  const status = document.createElement("p");
  status.className = "course-status";
  status.textContent = course.completed ? "✓ Completed" : "○ Not marked complete";
  const credits = document.createElement("p");
  credits.className = "course-credits";
  credits.textContent = `${course.credits} ${course.credits === 1 ? "credit" : "credits"}`;
  card.append(heading, title, status, credits);
  return card;
}

function renderCourseSelection(subject = "All") {
  const cards = document.querySelector("#course_cards");
  if (!cards) return;
  const selectedCourses = getCourseSelection(subject);
  cards.replaceChildren(...selectedCourses.map(createCourseCard));
  const total = getCourseCredits(selectedCourses);
  document.querySelector("#credit_total").textContent =
    `Total credits for displayed courses: ${total}`;
  const completed = selectedCourses.filter(course => course.completed).length;
  document.querySelector("#completion_summary").textContent =
    `${selectedCourses.length} courses shown · ${completed} marked complete`;
  document.querySelectorAll("[data-course-filter]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.courseFilter === subject));
  });
}

document.querySelectorAll("[data-course-filter]").forEach(button => {
  button.addEventListener("click", () => renderCourseSelection(button.dataset.courseFilter));
});
renderCourseSelection();
