
document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function(e) {
    if (e.key == "F12" || 
        (e.ctrlKey && e.shiftKey && (e.key == "I" || e.key == "C" || e.key == "J")) ||
        (e.ctrlKey && e.key == "U")) {
        e.preventDefault();
        return false;
    }
};
