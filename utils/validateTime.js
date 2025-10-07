// Convert time string (HH:MM) to minutes for comparison
const timeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
};

// Validate if appointment time is within operating hours
const validateAppointmentTime = (apptTime, openTime, closeTime) => {

    // Convert times to minutes for comparison
    const apptMinutes = timeToMinutes(apptTime);
    const openMinutes = timeToMinutes(openTime);
    const closeMinutes = timeToMinutes(closeTime);

    // Debug logging
    console.log('Appointment Minute', apptMinutes);
    console.log('Open Time (minutes):', openMinutes, `(${openTime})`);
    console.log('Close Time (minutes):', closeMinutes, `(${closeTime})`);

    // Check if appointment time is within operating hours (inclusive)
    const isValid = apptMinutes >= openMinutes && apptMinutes <= closeMinutes;
    console.log('Is Valid:', isValid);

    return isValid;
};

module.exports = {
    validateAppointmentTime
};
