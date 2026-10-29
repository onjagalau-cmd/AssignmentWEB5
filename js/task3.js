const form = document.getElementById("ticket-form");
form.noValidate = true; // Отключаем дефолтные всплывашки браузера

const fullName = document.getElementById("fullName");
const emailInput = document.getElementById("emailInput");
const sectorSelect = document.getElementById("sectorSelect");
const ticketQty = document.getElementById("ticketQty");

// Обновление билета справа
function updatePreview() {
    document.getElementById("prev-name").textContent = fullName.value || "Гость";
    document.getElementById("prev-email").textContent = emailInput.value || "-";
    document.getElementById("prev-sector").textContent = sectorSelect.value || "Не выбран";

    let price = sectorSelect.value === "VIP" ? 200 : 0;
    let qty = parseInt(ticketQty.value) || 0;
    document.getElementById("prev-price").textContent = `${price * qty} €`;
}

// Проверка одного поля
function validateField(input) {
    const errorEl = document.getElementById(`${input.id}-error`);
    let error = "";

    if (input.hasAttribute("required") && !input.value.trim()) {
        error = "Fill in this field.";
    } else if (input.id === "sectorSelect" && input.value === "SoldOut") {
        error = "This section is sold out! Choose VIP.";
    } else if (input.id === "fullName" && input.value.trim().length < 3) {
        error = "The name is too short (minimum 3 characters).";
    }

    if (error) {
        input.classList.add("is-invalid");
        errorEl.textContent = error;
        return false;
    } else {
        input.classList.remove("is-invalid");
        errorEl.textContent = "";
        return true;
    }
}

// Слушатели событий
[fullName, emailInput, sectorSelect, ticketQty].forEach(input => {
    input.addEventListener("input", () => {
        updatePreview();
        validateField(input);
    });
});

// Отправка формы
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    [fullName, emailInput, sectorSelect, ticketQty].forEach(input => {
        if (!validateField(input)) isValid = false;
    });

    if (isValid) {
        const msg = document.getElementById("result-msg");
        msg.textContent = `Success! Your ticket has been booked.`;
        msg.classList.remove("d-none");
        form.reset();
        updatePreview();
    }
});