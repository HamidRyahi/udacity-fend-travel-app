// Function to restrict user from selecting past days for departure input
const todayDate = () => {
    const departDate = document.getElementById('depart');
    
    // formatting users current date to yyyy-mm-dd
    // Format JavaScript date as yyyy-mm-dd from https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
    const todayDate = new Date().toISOString().slice(0, 10);

    // setting a min attribute for date input with the value of users current date
    departDate.setAttribute('min', `${todayDate}`)

}

todayDate()

export { todayDate }



