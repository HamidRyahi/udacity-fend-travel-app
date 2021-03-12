
const cityInput = document.getElementById('city');
let departDate = document.getElementById('depart');
let endDate = document.getElementById('end');
const waitText = document.querySelector('.wait');
const goButton = document.getElementById('generate');
const imgContainer = document.querySelector('.img_container');
const feedText = document.querySelector('.feed');
const rightBox = document.querySelector('.right_box');
let geoNamesData = []

if (goButton) {
	goButton.addEventListener('click', handleSubmit);
}

function handleSubmit(event) {
	event.preventDefault()
	if (cityInput.value === '' || departDate.value === '' || endDate.value === '') {
		alert('Please fill all required inputs')
	} else {
		waitText.textContent = 'Please wait a second! '
		let entredCity = cityInput.value;
		postGN('http://localhost:8081/geonames', { cityName: entredCity })
			.then(function (data) {
				postWB('http://localhost:8081/wbd', { latitude: data.latitude, longitude: data.longitude, days: Client.countdown() })
			})
			.then(function () {
				postPB('http://localhost:8081/pb', { cityName: `${entredCity}` })
			})
	}
}

const dayORdays = (num) => {
	if (num == 1) {
		return 'day'
	} else {
		return 'days'
	}
}

const updateUI = (dt) => {

	waitText.textContent = ''
	rightBox.style.display = 'flex';
	const numba = Client.lengthOfTrip();
	const numba2 = Client.countdown();

	if (dt.wbData[numba2] === undefined) {
		feedText.innerHTML = `<p>Your trip to: <strong>${geoNamesData[0].city}, ${geoNamesData[0].region}, ${geoNamesData[0].country}</strong></p>
			<p>Departing: ${departDate.value}</p>
			<p>End Date: ${endDate.value}</p>
			<p>${geoNamesData[0].city}, ${geoNamesData[0].country} is <strong>${Client.countdown()}</strong> ${dayORdays(numba2)} away</p>
			<p>The length of your trip is: <strong>${Client.lengthOfTrip()}</strong> ${dayORdays(numba)} </p>
			<p>The weather for <strong>${departDate.value}</strong> is not yet available.</p>`
	}

	if (dt.wbData[numba2] !== undefined) {
		feedText.innerHTML = `<p>Your trip to: <strong>${geoNamesData[0].city}, ${geoNamesData[0].region}, ${geoNamesData[0].country}</strong></p>
			<p>Departing: ${departDate.value}<br>
			End Date: ${endDate.value}</p>
			<p>${geoNamesData[0].city}, ${geoNamesData[0].country} is <strong>${Client.countdown()}</strong> ${dayORdays(numba2)} away</p>
			<p>The length of your trip is: <strong>${Client.lengthOfTrip()}</strong> ${dayORdays(numba)} </p>
			<p>Typical weather for ${dt.wbData[numba2].datetime} is:</p>
			<p><strong>High: ${dt.wbData[numba2].max_temp}, Low: ${dt.wbData[numba2].min_temp}</strong><br>
			<strong>${dt.wbData[numba2].weather.description}</strong> throughout the day.</p>`
		document.querySelector('.d1').innerHTML = `${dt.wbData[0].datetime}`
		document.querySelector('.d2').innerHTML = `${dt.wbData[1].datetime}`
		document.querySelector('.d3').innerHTML = `${dt.wbData[2].datetime}`
		document.querySelector('.d4').innerHTML = `${dt.wbData[3].datetime}`
		document.querySelector('.d5').innerHTML = `${dt.wbData[4].datetime}`
		document.querySelector('.d6').innerHTML = `${dt.wbData[5].datetime}`
		document.querySelector('.d7').innerHTML = `${dt.wbData[6].datetime}`
		document.querySelector('.weather_week').style.display = 'flex'
		document.querySelector('.i1').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${dt.wbData[0].weather.icon}.png`)
		document.querySelector('.w1h').textContent = `${dt.wbData[0].max_temp}`
		document.querySelector('.w1l').textContent = `${dt.wbData[0].min_temp}`
		document.querySelector('.i2').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${dt.wbData[1].weather.icon}.png`)
		document.querySelector('.w2h').textContent = `${dt.wbData[1].max_temp}`
		document.querySelector('.w2l').textContent = `${dt.wbData[1].min_temp}`
		document.querySelector('.i3').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${dt.wbData[2].weather.icon}.png`)
		document.querySelector('.w3h').textContent = `${dt.wbData[2].max_temp}`
		document.querySelector('.w3l').textContent = `${dt.wbData[2].min_temp}`
		document.querySelector('.i4').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${dt.wbData[3].weather.icon}.png`)
		document.querySelector('.w4h').textContent = `${dt.wbData[3].max_temp}`
		document.querySelector('.w4l').textContent = `${dt.wbData[3].min_temp}`
		document.querySelector('.i5').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${dt.wbData[4].weather.icon}.png`)
		document.querySelector('.w5h').textContent = `${dt.wbData[4].max_temp}`
		document.querySelector('.w5l').textContent = `${dt.wbData[4].min_temp}`
		document.querySelector('.i6').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${dt.wbData[5].weather.icon}.png`)
		document.querySelector('.w6h').textContent = `${dt.wbData[5].max_temp}`
		document.querySelector('.w6l').textContent = `${dt.wbData[5].min_temp}`
		document.querySelector('.i7').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${dt.wbData[6].weather.icon}.png`)
		document.querySelector('.w7h').textContent = `${dt.wbData[6].max_temp}`
		document.querySelector('.w7l').textContent = `${dt.wbData[6].min_temp}`
	}
	console.log(geoNamesData[0].latitude, geoNamesData[0].longitude)
	document.querySelector('.map').style.display = 'block'
}

const updateImg = (dt) => {
	if (dt.img !== undefined) {
		imgContainer.setAttribute('src', `${dt.img}`)
	}
	if (dt.img === undefined) {
		imgContainer.src = `${dt.countryFlagsBase}${geoNamesData[0].countryCode.toLowerCase()}.jpg`
	}
}

const postGN = async (url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	try {
		const data = await response.json();
		console.log(data);
		geoNamesData = []
		geoNamesData.push(data)
		console.log(geoNamesData)
		Client.mkmp(data.latitude, data.longitude);

		return data;
	} catch (error) {
		console.log("error", error);
		// appropriately handle the error
	}
}

const postWB = async (url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	try {
		const data = await response.json();
		console.log(data);
		updateUI(data)
		return data;
	} catch (error) {
		console.log("error", error);
		// appropriately handle the error
	}
}

const postPB = async (url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'POST', //
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	try {
		const data = await response.json();
		console.log(data)
		updateImg(data)
		return data;
	} catch (error) {
		console.log("error", error);
		// appropriately handle the error
	}
}

export { handleSubmit }