const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const newPort = document.querySelector("input").value;

    addNewPort(newPort);
    form.reset();
});

function addNewPort(newPort) {
    const userPort = new Port(newPort);
    itinerary.ports.push(userPort);
    controller.renderUserPort(userPort);
}