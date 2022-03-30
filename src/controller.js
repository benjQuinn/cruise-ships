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
                    ship.dock();
                    // this.renderHUD(`Current Port: ${ship.currentPort.name}`, `Next Port: ${ship.itinerary.ports[nextPortIndex].name}`);
                    this.renderHUD();
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

        renderHUD() {
            const bodyContainer = document.querySelector("#body");
            const hud = document.createElement("div");
            const pTop = document.createElement("p");
            const pBottom = document.createElement("p");
            const nextPortIndex = ship.itinerary.ports.indexOf(ship.currentPort) + 1;

            pTop.innerHTML = `Current Port: ${ship.currentPort.name}`;
            pBottom.innerHTML = `Next Port: ${ship.itinerary.ports[nextPortIndex].name}`;
            hud.id = "hud"
            hud.appendChild(pTop).appendChild(pBottom);
            bodyContainer.appendChild(hud)

            setTimeout(() => {
                bodyContainer.removeChild(hud);
            }, 4000);
        }
        // renderHUD(currentPort, nextPort) {
        //     const pTop = document.querySelector("#pTop");
        //     const pBottom = document.querySelector("#pBottom");
        //     const nextPortIndex = ship.itinerary.ports.indexOf(ship.currentPort) + 1;

        //     pTop.innerHTML = currentPort;
        //     pBottom.innerHTML = nextPort;

        // }

    }
    
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Controller;
    } else {
        window.Controller = Controller;
    }
}());
