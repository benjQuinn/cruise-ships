(function exportController() {    
    class Controller {
        constructor() {
            this.initialiseSea();
    }
        initialiseSea() {
            const backgrounds = [
                "./images/water0.png",
                "./images/water1.png"
            ];
            let backgroundIndex = 0;
            window.setInterval(() => {
                document.querySelector("#viewport").style.backgroundImage = `url("${backgrounds[backgroundIndex % backgrounds.length]}")`;
                backgroundIndex += 1;
            }, 500);
        }

        renderPorts(ports) {
            const portsElement = document.querySelector("#ports");
            
            portsElement.style.width = "0px";

            ports.forEach(element => {
                const newPort = document.createElement("div");
                newPort.setAttribute("class", "port");
                newPort.dataset.portName = element.name;
                newPort.dataset.portIndex = `${ports.indexOf(element)}`
                portsElement.appendChild(newPort);

                const portsElementWidth = parseInt(portsElement.style.width, 10);
                portsElement.style.width = `${portsElementWidth + 256}px`;
            });
        }

        renderShip(ship) {
            const shipsPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
            const portElement = document.querySelector(`[data-port-index='${shipsPortIndex}']`);
            const newShip = document.querySelector("#ship");
            newShip.style.top = `${portElement.offsetTop + 32}px`;
            newShip.style.left = `${portElement.offsetLeft - 32}px`;
        }
    }
    
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Controller;
    } else {
        window.Controller = Controller;
    }
}());
