"use strict";

const addItemForm = document.getElementById("add-item-form");
const itemsList = document.getElementById("items-list");
const itemsListContainer = document.getElementById("items-list-container");
const itemsListEmpty = document.getElementById("items-list-empty");
const highlightProjectButton = document.getElementById("highlight-project");

let items = [];

function createListItem(item) {
  const deleteButton = document.createElement("button");
  const listItem = document.createElement("li");

  deleteButton.classList.add("button", "button-delete");
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";

  listItem.textContent = item;
  listItem.appendChild(deleteButton);

  return listItem;
}

function updateList(newItem) {
  const newListItem = createListItem(newItem);
  itemsList.appendChild(newListItem);
}

/**
 * Load items from localStorage and update the UI if
 * items were found.
 */
function loadItemsFromStorage() {
  const itemsFromStorage = localStorage.getItem("items");

  if (itemsFromStorage) {
    // hide the empty list message and show the list
    itemsListEmpty.classList.add("hidden");
    itemsListContainer.classList.remove("hidden");

    items.push(...JSON.parse(itemsFromStorage));
    items.forEach((item) => updateList(item));
  }
}

// load items from localStorage and update the UI if
// items were found.
loadItemsFromStorage();

/**
 * Persist the items to localStorage and update the UI.
 * @param {string} newItem - The new item to add to the list.
 */
function appendAndPersistNewItem(newItem) {
  items.push(newItem);

  try {
    localStorage.setItem("items", JSON.stringify(items));
    updateList(newItem);

    if (itemsListContainer && itemsListContainer.classList.contains("hidden")) {
      itemsListContainer.classList.remove("hidden");
    }

    if (itemsListEmpty && !itemsListEmpty.classList.contains("hidden")) {
      itemsListEmpty.classList.add("hidden");
    }
  } catch (error) {
    throw new Error(`Error saving items: ${error.message}`);
  }
}

if (itemsList) {
  itemsList.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("button-delete")) {
      const item = target.parentElement.firstChild.textContent;
      items = items.filter((currentItem) => currentItem !== item);

      localStorage.setItem("items", JSON.stringify(items));
      target.parentElement.remove();
    }
  });
}

if (addItemForm) {
  addItemForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newItem = formData.get("item-name");
    appendAndPersistNewItem(newItem);
  });
}

function getRandomIntForMax(maxInt) {
  return Math.floor(Math.random() * maxInt);
}

function resetProjects(projects) {
  projects.forEach((project) => project.classList.remove("highlight"));
}

function highlightProject() {
  const projectList = document.getElementById("items-list");
  const projects = Array.from(projectList.querySelectorAll("li"));
  const randomProjectId = getRandomIntForMax(projects.length);

  resetProjects(projects);
  projects[randomProjectId].classList.add("highlight");
}

highlightProjectButton.addEventListener("click", () => {
  highlightProject();
});
