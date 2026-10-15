let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const savedTasksData = localStorage.getItem('task-list');
	if (savedTasksData != null) {
		const savedTasks = JSON.parse(savedTasksData);
		return savedTasks;
	}
	return items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	deleteButton.addEventListener('click', (_) => {
		clone.remove();
		saveTasks(getTasksFromDOM())
	});

	duplicateButton.addEventListener('click', () => {
		const localItem = createItem(textElement.textContent);
		listElement.prepend(localItem);
		items = getTasksFromDOM();
		saveTasks(items);
	});

	editButton.addEventListener('click', () => {
		textElement.contentEditable = true;
		textElement.focus();
	});

	textElement.addEventListener('blur', () => {
		textElement.contentEditable = false;
		items = getTasksFromDOM();
		saveTasks(items);
	});

	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	const tasks = [];
	itemsNamesElements.forEach((item) => {
		tasks.push(item.textContent);
	});
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem('task-list', JSON.stringify(tasks));
}

items = loadTasks()

items.forEach((task) => {
	const item = createItem(task);
	listElement.append(item);
})

formElement.addEventListener('submit', (event) => {
	event.preventDefault();
	const text = inputElement.value;
	const item = createItem(text);
	listElement.prepend(item);
	items = getTasksFromDOM();
	saveTasks(items);
	event.target.reset();
})