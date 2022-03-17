const departDate = document.querySelector('#depart');
const endDate = document.querySelector('#end');

const countdown = () => {
    let date1 = new Date(departDate.value);
    date1.setHours(0, 0, 0, 0);
    let date2 = new Date();
    date2.setHours(0, 0, 0, 0);
    let differenceInTime = date1.getTime() - date2.getTime();
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
}

const lengthOfTrip = () => {
    let date1 = new Date(endDate.value);
    date1.setHours(0, 0, 0, 0);
    let date2 = new Date(departDate.value);
    date2.setHours(0, 0, 0, 0);
    let differenceInTime = date1.getTime() - date2.getTime();
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);
    let num = parseInt(differenceInDays);
    return num;
}

export { countdown, lengthOfTrip }
