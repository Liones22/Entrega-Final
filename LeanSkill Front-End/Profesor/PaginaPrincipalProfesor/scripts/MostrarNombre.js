function setUserName(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.name){
        document.querySelectorAll('.user-name').forEach(el => el.textContent = user.name);
    }
}
window.addEventListener('DOMContentLoaded', setUserName);
