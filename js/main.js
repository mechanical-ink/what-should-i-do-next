"use strict";

const highlightProjectButton = document.getElementById("highlight-project");

function getRandomIntForMax(maxInt) {
  return Math.floor(Math.random() * maxInt);
}

function resetProjects(projects) {
  projects.forEach((project) => project.classList.remove("highlight"));
}

function highlightProject() {
  const projectList = document.getElementById("project-list");
  const projects = Array.from(projectList.querySelectorAll("li"));
  const randomProjectId = getRandomIntForMax(projects.length - 1);

  resetProjects(projects);
  projects[randomProjectId].classList.add("highlight");
}

highlightProjectButton.addEventListener("click", () => {
  highlightProject();
});
