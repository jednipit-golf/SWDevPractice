const validateTimeFormat = (apptTime) => {
    if (!apptTime) return false;

    const timeRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(apptTime);
};

module.exports = {
    validateTimeFormat
};
