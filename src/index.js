import "normalize.css";
import "./sass/main.scss";

function component() {
    const element = document.createElement("div");

    element.innerHTML = "Hello there";

    return element;
}

document.body.appendChild(component());
