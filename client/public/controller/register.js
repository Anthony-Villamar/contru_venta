
const boton = document.getElementById('registrar');
boton.addEventListener('click', async () => {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, email, password })
    });

    const data = await res.json();
    if (data.success) {
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        window.location.href = "login";
    } else {
        alert("Error: " + data.message);
    }
});
