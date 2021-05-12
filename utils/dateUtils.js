function getDate() {
    return new Date().toLocaleString('en-GB', {
        day: '2-digit', month: 'short'
    });
}

function getTime() {
    const d = new Date();
    return d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0")
}

function getDateAndTime() {
    return getDate() + " " + getTime()
}

module.exports.getDateAndTime = getDateAndTime;