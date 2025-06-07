async function loadInstructors(){
    const token = localStorage.getItem("token");
    const data = await fetch("http://localhost:9090/api/v1/users", {
        headers: {
            Authorization: token
        }
    }).then(r => r.json());
    
    const instructors = Object.values(data.users).filter(t => t.account.role === "INSTRUCTOR");
    console.log(instructors)
}

window.addEventListener("load", loadInstructors);