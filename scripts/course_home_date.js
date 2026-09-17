// Keep document.lastModified as its original string, as requested by the assignment.
"use strict";
const courseYear = document.querySelector("#currentyear");
const courseLastModified = document.querySelector("#lastModified");
if (courseYear) courseYear.textContent = `© ${new Date().getFullYear()}`;
if (courseLastModified) courseLastModified.textContent = `Last modified: ${document.lastModified}`;

