// Массив объектов (10 элементов)
const transfers = [
    { id: "1", name: "Isak", club: "Arsenal", status: "todo" },
    { id: "2", name: "Williams", club: "Barcelona", status: "todo" },
    { id: "3", name: "Osimhen", club: "PSG", status: "progress" },
    { id: "4", name: "Olmo", club: "Barcelona", status: "done" },
    { id: "5", name: "Merino", club: "Arsenal", status: "todo" },
    { id: "6", name: "Calafiori", club: "Arsenal", status: "todo" },
    { id: "7", name: "Yoro", club: "Man Utd", status: "done" },
    { id: "8", name: "Sancho", club: "Chelsea", status: "todo" },
    { id: "9", name: "Chiesa", club: "Liverpool", status: "todo" },
    { id: "10", name: "Felix", club: "Chelsea", status: "progress" }
];

const colTodo = document.getElementById("col-todo");
const colProgress = document.getElementById("col-progress");
const colDone = document.getElementById("col-done");
const filterInput = document.getElementById("filter-input");
const alertMsg = document.getElementById("alert-msg");

function render() {
    colTodo.replaceChildren();
    colProgress.replaceChildren();
    colDone.replaceChildren();

    const search = filterInput.value.toLowerCase();

    for (const item of transfers) {
        if (!item.name.toLowerCase().includes(search)) continue;

        // Создаем карточку
        const card = document.createElement("div");
        card.className = "p-3 mb-2 bg-dark rounded border border-secondary text-white d-flex justify-content-between align-items-center";

        // Текст с именем и клубом
        const info = document.createElement("span");
        info.innerHTML = `<strong>${item.name}</strong> <small class="text-secondary">(${item.club})</small>`;
        card.appendChild(info);

        // Контейнер для кнопок
        const btnGroup = document.createElement("div");

        if (item.status !== "todo") {
            const btnPrev = document.createElement("button");
            btnPrev.className = "btn btn-sm btn-outline-secondary me-1";
            btnPrev.textContent = "◄";
            btnPrev.onclick = () => moveItem(item.id, "prev");
            btnGroup.appendChild(btnPrev);
        }

        if (item.status !== "done") {
            const btnNext = document.createElement("button");
            btnNext.className = "btn btn-sm btn-success";
            btnNext.textContent = "►";
            btnGroup.appendChild(btnNext);
        }

        card.appendChild(btnGroup);

        if (item.status === "todo") colTodo.appendChild(card);
        else if (item.status === "progress") colProgress.appendChild(card);
        else if (item.status === "done") colDone.appendChild(card);
    }
}

function moveItem(id, dir) {
    const item = transfers.find(t => t.id === id);
    alertMsg.classList.add("d-none");

    if (dir === "next") {
        if (item.status === "todo") {
            // Лимит: Не больше 3 в колонке "progress"
            const count = transfers.filter(t => t.status === "progress").length;
            if (count >= 3) {
                alertMsg.textContent = "Ошибка: В колонке 'Переговоры' может быть максимум 3 игрока!";
                alertMsg.classList.remove("d-none");
                return;
            }
            item.status = "progress";
        } else if (item.status === "progress") item.status = "done";
    } else {
        if (item.status === "done") item.status = "progress";
        else if (item.status === "progress") item.status = "todo";
    }
    render();
}

filterInput.addEventListener("input", render);
render();