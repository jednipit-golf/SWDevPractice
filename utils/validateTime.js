const Reservation = require('../models/Reservation');

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
    // console.log('Appointment Minute', apptMinutes);
    // console.log('Open Time (minutes):', openMinutes, `(${openTime})`);
    // console.log('Close Time (minutes):', closeMinutes, `(${closeTime})`);

    // Check if appointment time is within operating hours (inclusive)
    const isValid = apptMinutes >= openMinutes && apptMinutes <= closeMinutes;
    // console.log('Is Valid:', isValid);

    return isValid;
};


const timeCancellingPolicyCheck = (apptDate, apptTime) => {
    if (!apptDate || !apptTime) return false;

    // Parse date from DD-MM-YYYY format
    const [day, month, year] = apptDate.split('-').map(Number);
    const [hours, minutes] = apptTime.split(':').map(Number);

    // Create appointment datetime
    const appointmentDateTime = new Date(year, month - 1, day, hours, minutes);

    // Get current time
    const currentTime = new Date();

    // Calculate time difference in milliseconds
    const timeDifference = appointmentDateTime.getTime() - currentTime.getTime();

    // Convert to hours (3 hours = 3 * 60 * 60 * 1000 milliseconds)
    const hoursUntilAppointment = timeDifference / (1000 * 60 * 60);

    // Debug logging
    // console.log('Appointment Date:', apptDate);
    // console.log('Appointment Time:', apptTime);
    // console.log('Appointment DateTime:', appointmentDateTime);
    // console.log('Current Time:', currentTime);
    // console.log('Hours Until Appointment:', hoursUntilAppointment);
    // console.log('Can Cancel (>=3 hours):', hoursUntilAppointment >= 3);

    // Allow cancellation if appointment is more than 3 hours away 
    return hoursUntilAppointment >= 3;
}

const timePastingCheck = (apptDate, apptTime) => {
    if (!apptDate || !apptTime) return false;
    // Parse date from DD-MM-YYYY format
    const [day, month, year] = apptDate.split('-').map(Number);
    const [hours, minutes] = apptTime.split(':').map(Number);
    // Create appointment datetime
    const appointmentDateTime = new Date(year, month - 1, day, hours, minutes);
    // Get current time
    const currentTime = new Date();

    // Calculate time difference in milliseconds
    const timeDifference = appointmentDateTime.getTime() - currentTime.getTime();

    // Convert to hours (3 hours = 3 * 60 * 60 * 1000 milliseconds)
    const hoursUntilAppointment = timeDifference / (1000 * 60 * 60);

    // Debug logging
    // console.log('Appointment Date:', apptDate);
    // console.log('Appointment Time:', apptTime);
    // console.log('Appointment DateTime:', appointmentDateTime);
    // console.log('Current Time:', currentTime);
    // console.log('Hours Until Appointment:', hoursUntilAppointment);
    // console.log('time past :', hoursUntilAppointment < 0);

    // if appointment time is in the past, return  true
    return hoursUntilAppointment < 0;
}

async function deletePastReservation() {
    try {
        const pastReservations = await Reservation.find();
        
        for (const reservation of pastReservations) {
            if (timePastingCheck(reservation.apptDate, reservation.apptTime)) {
                await Reservation.findByIdAndDelete(reservation._id);
            }
        }
    } catch (err) {
        console.error('Error cleaning expired bookings:', err.stack || err);
    }
}

module.exports = {
    validateAppointmentTime,
    timeCancellingPolicyCheck,
    timePastingCheck,
    deletePastReservation
};
