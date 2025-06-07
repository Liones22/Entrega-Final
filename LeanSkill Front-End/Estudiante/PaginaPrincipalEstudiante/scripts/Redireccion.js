window.addEventListener("load", () => {
    const token = localStorage.getItem("token");
    if(!token){
        console.log("No se ha iniciado sesion.");
        return;
    }
})