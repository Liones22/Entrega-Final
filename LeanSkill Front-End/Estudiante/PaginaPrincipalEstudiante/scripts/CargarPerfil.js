async function loadProfile(){
    const token = localStorage.getItem("token") || (() => { throw new Error("NOT_LOGGED"); })();
    const profile = await fetch("http://localhost:9090/api/v1/profile?gs=1&gc=1", {
        method: "get",
        headers: {
            Authorization: token
        }
    }).then(r => r.json());

    console.log(profile);
}

window.addEventListener("load", loadProfile);