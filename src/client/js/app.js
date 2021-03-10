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
		let entredCity = document.getElementById('city').value;
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
						console.log(weatherBitData)
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
		console.log('my numba', numba);
		const dayORdays = () => {
			if (numba == 1) {
				return 'day'
			} else {
				return 'days'
			}
		}

		const numba2 = Client.countdown();
		console.log('my numba', numba2);
		const dayORdays2 = () => {
			if (numba2 == 1) {
				return 'day'
			} else {
				return 'days'
			}
		}

		const updateUI = (res) => {
			waitText.textContent = ''
			if (res.img !== undefined) {
				document.querySelector('.img_container').style.display = 'flex';
				document.querySelector('.countryFlag').setAttribute('src', '')
				document.querySelector('.countryFlag').style.display = 'none';
				// document.querySelector('.img_container').style.display = 'block';
				// document.querySelector('.img_container').style.cssText = `background-image: url("${res.img}"); background-position: center; background-repeat: no-repeat; background-size: cover;`;
				document.querySelector('.img_container').setAttribute('src', `${res.img}`)
			}
			if (res.img === undefined) {
				document.querySelector('.img_container').style.display = 'flex';
				document.querySelector('.countryFlag').style.display = 'block';
				document.querySelector('.img_container').style.display = 'none';
				document.querySelector('.countryFlag').setAttribute('src', `${res.countryFlagsBase}${geoNamesData[0].countryCode.toLowerCase()}.jpg`)
			}
			document.querySelector('.right_box').style.display = 'flex';
			console.log(weatherBitData)
			if (weatherBitData[0].lowTemp === undefined) {
				document.querySelector('.feed').innerHTML = `<p>Your trip to: <strong>${geoNamesData[0].city}, ${geoNamesData[0].region}, ${geoNamesData[0].country}</strong></p>
					<p>Departing: ${departDate.value}</p>
					<p>End Date: ${endDate.value}</p>
					<p>${geoNamesData[0].city}, ${geoNamesData[0].country} is <strong>${Client.countdown()}</strong> ${dayORdays2()} away</p>
					<p>The length of your trip is: <strong>${Client.lengthOfTrip()}</strong> ${dayORdays()} </p>
					<p>The weather for ${departDate.value} is not yet available.</p>`
			}
			if (weatherBitData[0].lowTemp !== undefined) {
				document.querySelector('.feed').innerHTML = `<p>Your trip to: <strong>${geoNamesData[0].city}, ${geoNamesData[0].region}, ${geoNamesData[0].country}</strong></p>
					<p>Departing: ${departDate.value}<br>
					End Date: ${endDate.value}</p>
					<p>${geoNamesData[0].city}, ${geoNamesData[0].country} is <strong>${Client.countdown()}</strong> ${dayORdays2()} away</p>
					<p>The length of your trip is: <strong>${Client.lengthOfTrip()}</strong> ${dayORdays()} </p>
					<p>Typical weather for ${weatherBitData[0].date} is:</p>
					<p><strong>High: ${weatherBitData[0].maxTemp}, Low: ${weatherBitData[0].lowTemp}</strong><br>
					<strong>${weatherBitData[0].description}</strong> throughout the day.</p>`
			}

		}

	}
}

export { handleSubmit }