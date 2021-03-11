const cityInput = document.getElementById('city');
let departDate = document.getElementById('depart');
let endDate = document.getElementById('end');
const waitText = document.querySelector('.wait');
const goButton = document.getElementById('generate');

if (goButton) {
	goButton.addEventListener('click', handleSubmit);
}

function handleSubmit(event) {
	event.preventDefault()

	let geoNamesData = []
	let weatherBitData = []
	let pixaBayData = []
	console.log('pbdataarray1', pixaBayData)
	let entredCity = cityInput.value;

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
			// console.log(data);
			geoNamesData.push(data)
			// console.log('GNdataarray', geoNamesData)
			return data;
		} catch (error) {
			console.log("error", error);
			// appropriately handle the error
		}
	}

	const postWB = async (url = '', data = {}) => {
		// console.log(data);
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
			// console.log(data);
			weatherBitData.push(data);
			// console.log('WBdataarray', weatherBitData)
			return data;
		} catch (error) {
			console.log("error", error);
			// appropriately handle the error
		}
	}

	const postPB = async (url = '', data = {}) => {
		// console.log(data);
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
			console.log(data);
			console.log(data.img);
			pixaBayData.push(data);
			console.log('image string', pixaBayData[0].img)
			return data;
		} catch (error) {
			console.log("error", error);
			// appropriately handle the error
		}
	}
	

	const numba = Client.lengthOfTrip();
	const numba2 = Client.countdown();

	const dayORdays = (num) => {
		if (num == 1) {
			return 'day'
		} else {
			return 'days'
		}
	}
	console.log('pbdataarray2', pixaBayData)

	const updateUI = (pixaBayData) => {
		const imgContainer = document.querySelector('.img_container');
		const feedText = document.querySelector('.feed');
		const rightBox = document.querySelector('.right_box');

		waitText.textContent = ''
		rightBox.style.display = 'flex';
		console.log('pbdataarray3', pixaBayData)

		if (pixaBayData[0].img !== undefined) {
			imgContainer.setAttribute('src', `${pixaBayData[0]}`)
		}
		// if (pixaBayData.img === undefined) {
		// 	imgContainer.src = `${pixaBayData[0].countryFlagsBase}${gndata[0].countryCode.toLowerCase()}.jpg`
		// }
		// if (weatherBitData[0].wbData[numba2] === undefined) {
		// 	feedText.innerHTML = `<p>Your trip to: <strong>${geoNamesData[0].city}, ${geoNamesData[0].region}, ${geoNamesData[0].country}</strong></p>
		// 		<p>Departing: ${departDate.value}</p>
		// 		<p>End Date: ${endDate.value}</p>
		// 		<p>${geoNamesData[0].city}, ${geoNamesData[0].country} is <strong>${Client.countdown()}</strong> ${dayORdays(numba2)} away</p>
		// 		<p>The length of your trip is: <strong>${Client.lengthOfTrip()}</strong> ${dayORdays(numba)} </p>
		// 		<p>The weather for <strong>${departDate.value}</strong> is not yet available.</p>`
		// }
		// if (weatherBitData[0].wbData[numba2] !== undefined) {
		// 	feedText.innerHTML = `<p>Your trip to: <strong>${geoNamesData[0].city}, ${geoNamesData[0].region}, ${geoNamesData[0].country}</strong></p>
		// 		<p>Departing: ${departDate.value}<br>
		// 		End Date: ${endDate.value}</p>
		// 		<p>${geoNamesData[0].city}, ${geoNamesData[0].country} is <strong>${Client.countdown()}</strong> ${dayORdays(numba2)} away</p>
		// 		<p>The length of your trip is: <strong>${Client.lengthOfTrip()}</strong> ${dayORdays(numba)} </p>
		// 		<p>Typical weather for ${weatherBitData[0].wbData[numba2].datetime} is:</p>
		// 		<p><strong>High: ${weatherBitData[0].wbData[numba2].max_temp}, Low: ${weatherBitData[0].wbData[numba2].min_temp}</strong><br>
		// 		<strong>${weatherBitData[0].wbData[numba2].weather.description}</strong> throughout the day.</p>`

		// 	document.querySelector('.d1').innerHTML = `${weatherBitData[0].wbData[0].datetime}`
		// 	document.querySelector('.d2').innerHTML = `${weatherBitData[0].wbData[1].datetime}`
		// 	document.querySelector('.d3').innerHTML = `${weatherBitData[0].wbData[2].datetime}`
		// 	document.querySelector('.d4').innerHTML = `${weatherBitData[0].wbData[3].datetime}`
		// 	document.querySelector('.d5').innerHTML = `${weatherBitData[0].wbData[4].datetime}`
		// 	document.querySelector('.d6').innerHTML = `${weatherBitData[0].wbData[5].datetime}`
		// 	document.querySelector('.d7').innerHTML = `${weatherBitData[0].wbData[6].datetime}`
		// 	////
		// 	document.querySelector('.weather_week').style.display = 'flex'
		// 	document.querySelector('.i1').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${weatherBitData[0].wbData[0].weather.icon}.png`)
		// 	document.querySelector('.w1h').textContent = `${weatherBitData[0].wbData[0].max_temp}`
		// 	document.querySelector('.w1l').textContent = `${weatherBitData[0].wbData[0].min_temp}`

		// 	document.querySelector('.i2').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${weatherBitData[0].wbData[1].weather.icon}.png`)
		// 	document.querySelector('.w2h').textContent = `${weatherBitData[0].wbData[1].max_temp}`
		// 	document.querySelector('.w2l').textContent = `${weatherBitData[0].wbData[1].min_temp}`

		// 	document.querySelector('.i3').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${weatherBitData[0].wbData[2].weather.icon}.png`)
		// 	document.querySelector('.w3h').textContent = `${weatherBitData[0].wbData[2].max_temp}`
		// 	document.querySelector('.w3l').textContent = `${weatherBitData[0].wbData[2].min_temp}`

		// 	document.querySelector('.i4').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${weatherBitData[0].wbData[3].weather.icon}.png`)
		// 	document.querySelector('.w4h').textContent = `${weatherBitData[0].wbData[3].max_temp}`
		// 	document.querySelector('.w4l').textContent = `${weatherBitData[0].wbData[3].min_temp}`

		// 	document.querySelector('.i5').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${weatherBitData[0].wbData[4].weather.icon}.png`)
		// 	document.querySelector('.w5h').textContent = `${weatherBitData[0].wbData[4].max_temp}`
		// 	document.querySelector('.w5l').textContent = `${weatherBitData[0].wbData[4].min_temp}`

		// 	document.querySelector('.i6').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${weatherBitData[0].wbData[5].weather.icon}.png`)
		// 	document.querySelector('.w6h').textContent = `${weatherBitData[0].wbData[5].max_temp}`
		// 	document.querySelector('.w6l').textContent = `${weatherBitData[0].wbData[5].min_temp}`

		// 	document.querySelector('.i7').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${weatherBitData[0].wbData[6].weather.icon}.png`)
		// 	document.querySelector('.w7h').textContent = `${weatherBitData[0].wbData[6].max_temp}`
		// 	document.querySelector('.w7l').textContent = `${weatherBitData[0].wbData[6].min_temp}`

		// }

	}

	if (cityInput.value === '' || departDate.value === '' || endDate.value === '') {
		alert('Please fill all required inputs')
	} else {
		waitText.textContent = 'Please wait a second! '

		postGN('http://localhost:8081/geonames', { cityName: entredCity })
			.then(function (data) {
				postWB('http://localhost:8081/wbd', { latitude: data.latitude, longitude: data.longitude, days: Client.countdown() })
			})
			.then(function () {
				postPB('http://localhost:8081/pb', { cityName: `${entredCity}` })
			})
			.then(
				updateUI(pixaBayData)
			)
	}

}

export { handleSubmit }