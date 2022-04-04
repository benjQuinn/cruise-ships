(function exportController() {    
    class Controller {
        constructor(ship) {
            this.ship = ship;
            this.initialiseSea();
            this.initialiseHUD();

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

        initialiseHUD() {
            const hud = document.querySelector("#hud");
            const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
            const nextPortIndex = currentPortIndex + 1;

            hud.innerHTML = `Current Port: ${ship.currentPort.name} <br/> Next Port: ${ship.itinerary.ports[nextPortIndex].name}`;
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
            const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
            const nextPortIndex = currentPortIndex + 1;
            const nextPortElement = document.querySelector(`[data-port-index='${nextPortIndex}']`);

            if(!nextPortElement) {
                return this.renderMessage("End of the line!");
            }
            
            this.updateHUD(`Sailing...`);
            this.renderMessage(`Now departing ${ship.currentPort.name}...`);

            const shipElement = document.querySelector("#ship");
            const sailInterval = setInterval(() => {
                const shipLeft = parseInt(shipElement.style.left, 10);
                if (shipLeft === (nextPortElement.offsetLeft - 32)) {

                    ship.leavePort();
                    ship.dock();

                    if (currentPortIndex === ship.itinerary.ports.length - 2) {
                        return this.updateHUD(`Current Port: ${ship.currentPort.name}`);
                    } else {
                         this.updateHUD(`Current Port: ${ship.currentPort.name} <br/> Next Port: ${ship.itinerary.ports[nextPortIndex + 1].name}`);
                    };
                    
                    this.renderMessage(`Now docked at ${ship.currentPort.name}`);
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

        updateHUD(message) {
            const hud = document.querySelector("#hud");

            hud.innerHTML = message;
        }

    }
    
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Controller;
    } else {
        window.Controller = Controller;
    }
}());
