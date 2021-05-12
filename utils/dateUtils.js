function getDate() {
    return new Date().toLocaleString('en-GB', {
        day: '2-digit', month: 'short'
    });
}

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0")
    var ampm = hours >= 12 ? 'PM' : 'AM';

    return date.getHours() + ":" + minutes + ampm;
}

function getDateAndTime() {
    return getDate() + " " + getTime()
}

module.exports.getDateAndTime = getDateAndTime;