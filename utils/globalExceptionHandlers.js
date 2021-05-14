const { handleFailure } = require("./utils");

module.exports.attachErrorHandlers = (e) => {
    process
        .on('unhandledRejection', (reason, p) => {
            const report = `${reason} Unhandled Rejection at Promise ${JSON.stringify(reason.stack)}`
            handleFailure(report);
        })
        .on('uncaughtException', err => {
            handleFailure(JSON.stringify(err));
        });
}