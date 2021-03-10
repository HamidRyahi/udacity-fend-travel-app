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
	if (cityInput.value === '' || departDate.value === '' || endDate.value === '') {
		alert('Please fill all required inputs')
	} else {
		let geoNamesData = []
		let weatherBitData = []
		let entredCity = cityInput.value;
		console.log(entredCity)
		waitText.textContent = 'Please wait a second! '

		fetch('http://localhost:8081/geonames', {
			method: "POST",
			headers: {
				"Content-Type": "application/JSON"
			},
			body: JSON.stringify({ cityName: entredCity })
		})
			.then(res => res.json())
			.then(function (res) {
				geoNamesData.push(res)
				console.log('GN data', geoNamesData)
				fetch('http://localhost:8081/wbd', {
					method: "POST",
					headers: {
						"Content-Type": "application/JSON"
					},
					body: JSON.stringify({ latitude: geoNamesData[0].latitude, longitude: geoNamesData[0].longitude, days: Client.countdown() })
				})
					.then(res => res.json())
					.then(function (res) {
						weatherBitData.push(res);
						console.log('WB data', weatherBitData)
						fetch('http://localhost:8081/pb', {
							method: "POST",
							headers: {
								"Content-Type": "application/JSON"
							},
							body: JSON.stringify({ cityName: `${entredCity}%20${geoNamesData[0].country}`, country: geoNamesData[0].country })
						})
							.then(res => res.json())
							.then(function (res) {
								updateUI(res)
							})
					})
			})

		const numba = Client.lengthOfTrip();
		const numba2 = Client.countdown();

		const dayORdays = (num) => {
			if (num == 1) {
				return 'day'
			} else {
				return 'days'
			}
		}
		const updateUI = (res) => {
			const imgContainer = document.querySelector('.img_container');
			const feedText = document.querySelector('.feed');
			const rightBox = document.querySelector('.right_box');

			waitText.textContent = ''
			rightBox.style.display = 'flex';
			if (res.img !== undefined) {
				imgContainer.setAttribute('src', `${res.img}`)
			}
			if (res.img === undefined) {
				imgContainer.setAttribute('src', `${res.countryFlagsBase}${geoNamesData[0].countryCode.toLowerCase()}.jpg`)
			}
			// console.log('lolo', weatherBitData[0].wbData[numba2].datetime)
			// console.log('lolo', weatherBitData[0].wbData[2].low_temp)
			if (weatherBitData[0].wbData[numba2] === undefined) {
				feedText.innerHTML = `<p>Your trip to: <strong>${geoNamesData[0].city}, ${geoNamesData[0].region}, ${geoNamesData[0].country}</strong></p>
					<p>Departing: ${departDate.value}</p>
					<p>End Date: ${endDate.value}</p>
					<p>${geoNamesData[0].city}, ${geoNamesData[0].country} is <strong>${Client.countdown()}</strong> ${dayORdays(numba2)} away</p>
					<p>The length of your trip is: <strong>${Client.lengthOfTrip()}</strong> ${dayORdays(numba)} </p>
					<p>The weather for <strong>${departDate.value}</strong> is not yet available.</p>`
			}
			if (weatherBitData[0].wbData[numba2] !== undefined) {
				console.log('numba2', numba2)
				console.log('ghgh', weatherBitData[0].wbData[3].datetime, weatherBitData[0].wbData[3].high_temp, weatherBitData[0].wbData[3].low_temp)
				feedText.innerHTML = `<p>Your trip to: <strong>${geoNamesData[0].city}, ${geoNamesData[0].region}, ${geoNamesData[0].country}</strong></p>
					<p>Departing: ${departDate.value}<br>
					End Date: ${endDate.value}</p>
					<p>${geoNamesData[0].city}, ${geoNamesData[0].country} is <strong>${Client.countdown()}</strong> ${dayORdays(numba2)} away</p>
					<p>The length of your trip is: <strong>${Client.lengthOfTrip()}</strong> ${dayORdays(numba)} </p>
					<p>Typical weather for ${weatherBitData[0].wbData[numba2].datetime} is:</p>
					<p><strong>High: ${weatherBitData[0].wbData[numba2].high_temp}, Low: ${weatherBitData[0].wbData[numba2].low_temp}</strong><br>
					<strong>${weatherBitData[0].wbData[numba2].weather.description}</strong> throughout the day.</p>`
				document.querySelector('.d1').innerHTML = `${weatherBitData[0].wbData[0].datetime}`
				document.querySelector('.d2').innerHTML = `${weatherBitData[0].wbData[1].datetime}`
				document.querySelector('.d3').innerHTML = `${weatherBitData[0].wbData[2].datetime}`
				document.querySelector('.d4').innerHTML = `${weatherBitData[0].wbData[3].datetime}`
				document.querySelector('.d5').innerHTML = `${weatherBitData[0].wbData[4].datetime}`
				document.querySelector('.d6').innerHTML = `${weatherBitData[0].wbData[5].datetime}`
				document.querySelector('.d7').innerHTML = `${weatherBitData[0].wbData[6].datetime}`
				////
				document.querySelector('.weather_week').style.display = 'flex'
				document.querySelector('.i1').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${weatherBitData[0].wbData[0].weather.icon}.png`)
				document.querySelector('.w1h').textContent = `${weatherBitData[0].wbData[0].high_temp}`
				document.querySelector('.w1l').textContent = `${weatherBitData[0].wbData[0].low_temp}`
				
				document.querySelector('.i2').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${weatherBitData[0].wbData[1].weather.icon}.png`)
				document.querySelector('.w2h').textContent = `${weatherBitData[0].wbData[1].high_temp}`
				document.querySelector('.w2l').textContent = `${weatherBitData[0].wbData[1].low_temp}`

				document.querySelector('.i3').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${weatherBitData[0].wbData[2].weather.icon}.png`)
				document.querySelector('.w3h').textContent = `${weatherBitData[0].wbData[2].high_temp}`
				document.querySelector('.w3l').textContent = `${weatherBitData[0].wbData[2].low_temp}`

				document.querySelector('.i4').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${weatherBitData[0].wbData[3].weather.icon}.png`)
				document.querySelector('.w4h').textContent = `${weatherBitData[0].wbData[3].high_temp}`
				document.querySelector('.w4l').textContent = `${weatherBitData[0].wbData[3].low_temp}`

				document.querySelector('.i5').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${weatherBitData[0].wbData[4].weather.icon}.png`)
				document.querySelector('.w5h').textContent = `${weatherBitData[0].wbData[4].high_temp}`
				document.querySelector('.w5l').textContent = `${weatherBitData[0].wbData[4].low_temp}`

				document.querySelector('.i6').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${weatherBitData[0].wbData[5].weather.icon}.png`)
				document.querySelector('.w6h').textContent = `${weatherBitData[0].wbData[5].high_temp}`
				document.querySelector('.w6l').textContent = `${weatherBitData[0].wbData[5].low_temp}`

				document.querySelector('.i7').setAttribute('src', `https://www.weatherbit.io/static/img/icons/${weatherBitData[0].wbData[6].weather.icon}.png`)
				document.querySelector('.w7h').textContent = `${weatherBitData[0].wbData[6].high_temp}`
				document.querySelector('.w7l').textContent = `${weatherBitData[0].wbData[6].low_temp}`

			}

		}

	}
}

export { handleSubmit }