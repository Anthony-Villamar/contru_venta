
const boton = document.getElementById('LoginUser');
boton.addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.success) {
        alert(`Bienvenido ${data.nombre}`);
        if (data.rol === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "venta.html";
        }
    } else {
        alert("Credenciales incorrectas");
    }

});
