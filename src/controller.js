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
                const newDiv = document.createElement("div");
                newDiv.setAttribute("class", "port");
                newDiv.dataset.portName = element.name;
                newDiv.dataset.portIndex = `${ports.indexOf(element)}`
                portsElement.appendChild(newDiv);

                const portsElementWidth = parseInt(portsElement.style.width, 10);
                portsElement.style.width = `${portsElementWidth + 256}px`;
            });
        }
    }
    
    if (typeof module !== "undefined" && module.exports) {
        module.exports = Controller;
    } else {
        window.Controller = Controller;
    }
}());
