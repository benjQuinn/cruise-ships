(function exportController() {    
    class Controller {
        constructor(ship) {
            this.ship = ship;
            this.initialiseSea();

            const setSailButton = document.querySelector("#setsail");
            setSailButton.addEventListener('click', () => {
                this.setSail();
            });
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

        renderShip() {
            const ship = this.ship;
            const shipsPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
            const portElement = document.querySelector(`[data-port-index='${shipsPortIndex}']`);
            const shipElement = document.querySelector("#ship");
            shipElement.style.top = `${portElement.offsetTop + 32}px`;
            shipElement.style.left = `${portElement.offsetLeft - 32}px`;
        }

        setSail() {
            const ship = this.ship;
            const nextPortIndex = ship.itinerary.ports.indexOf(ship.currentPort) + 1;
            const nextPortElement = document.querySelector(`[data-port-index='${nextPortIndex}']`);

            if(!nextPortElement) {
                return this.renderMessage("End of the line!");
            }

            this.renderMessage(`Now departing ${ship.currentPort.name}...`);

            const shipElement = document.querySelector("#ship");
            const sailInterval = setInterval(() => {
                const shipLeft = parseInt(shipElement.style.left, 10);
                if (shipLeft === (nextPortElement.offsetLeft - 32)) {
                    ship.leavePort();
                    // document.querySelector("#viewport").scrollLeft += 100;
                    ship.dock();
                    this.renderMessage(`Now docked at ${ship.currentPort.name}`)
                    clearInterval(sailInterval);
                }
                shipElement.style.left = `${shipLeft + 1}px`
                document.querySelector("#viewport").scrollLeft += 1;
            }, 20);
        }

        renderMessage(message) {
            const bodyContainer = document.querySelector("#body");
            const messageBox = document.createElement("div");
            const p = document.createElement("p");
            
            p.innerHTML = message;
            messageBox.id = "message";
            messageBox.appendChild(p);
            bodyContainer.appendChild(messageBox);
            
            setTimeout(() => {
                bodyContainer.removeChild(messageBox);
            }, 2000);
        }
    }
    
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Controller;
    } else {
        window.Controller = Controller;
    }
}());
