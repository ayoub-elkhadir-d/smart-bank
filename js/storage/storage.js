
function save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}



function get(key) {
    const data = localStorage.getItem(key);

    if (data === null) {
        return null;
    }

    return JSON.parse(data);
}


function remove(key) {
    localStorage.removeItem(key);
}


export { save, get, remove };
