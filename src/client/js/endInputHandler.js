
// Function to restrict user from selecting past days for end date input
const endInputHandler = () => {
    const departDate = document.getElementById('depart');
    const endDate = document.getElementById('end');

    // formatting users current date to yyyy-mm-dd
    // Format JavaScript date as yyyy-mm-dd from https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
    const tripDate = new Date(departDate.value).toISOString().slice(0, 10);
    
    // setting a min attribute for end input with the value of users selected departure date
    endDate.setAttribute('min', `${tripDate}`)

}

export {endInputHandler}