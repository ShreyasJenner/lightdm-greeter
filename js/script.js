document.addEventListener("DOMContentLoaded", function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", (Math.random() > 0.5) ? "../html/lily.html" : "../html/lain.html", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.documentElement.innerHTML = xhr.responseText;
            executeScripts();
        }
    };
    xhr.send();
});

function executeScripts() {
    const scripts = document.querySelectorAll("script");
    scripts.forEach((script) => {
        if (script.src) {
            const newScript = document.createElement("script");
            newScript.src = script.src;
            document.body.appendChild(newScript);
        } else {
            eval(script.innerText); // Run inline scripts
        }
    });
}
