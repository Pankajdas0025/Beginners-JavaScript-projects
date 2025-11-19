  document.addEventListener("keydown", (e) => {
            document.getElementById("keyValue").textContent = e.key.toUpperCase();
            document.getElementById("keyCode").textContent = e.keyCode;
        });