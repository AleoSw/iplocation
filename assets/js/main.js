const form = document.querySelector('#form')
const inputSearch = document.querySelector('#inputSearch')
form.addEventListener('submit', (e) => {
	e.preventDefault()
	if (inputSearch.value.length > 0) {
		getData(inputSearch.value)
	}
})


const getData = async (ip) => {
	try {
		if(ip === undefined) {
			const API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_X4YCFJDMScwpxTZbPSxHMd64Ow1c1&ipAddress=`
			const response = await fetch(API_URL)
			const data = await response.json()
			renderData(data)
			renderMap(data)
		} else {
			const API_URL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_X4YCFJDMScwpxTZbPSxHMd64Ow1c1&ipAddress=`
			const response = await fetch(API_URL + ip)
			const data = await response.json()
			renderData(data)
			renderMap(data)
		}
	} catch (error) {
		console.log(error)
	}
}

const renderData = (data) => {
	const nodata = document.querySelector('.title-nodata')
	nodata.style.display = "none"
	const templateData = document.querySelector('#templateCards').content
	const fragment = document.createDocumentFragment()
	const container = document.querySelector('#results')
	container.innerHTML = ''
	fragment.innerHTML = ''
	const clone = templateData.cloneNode(true)
	clone.querySelector('#ipAddress').textContent = data.ip
	clone.querySelector('#location').textContent = data.location.city
	clone.querySelector('#time').textContent = `UTC ${data.location.timezone}`
	clone.querySelector('#isp').textContent = data.isp

	fragment.appendChild(clone)
	container.appendChild(fragment)
}



const renderMap = (data) => {

const container = document.querySelector('.map-container')
container.innerHTML = ''
container.innerHTML = `<div id="map"></div>`

let latitude = data.location.lat
let longitude = data.location.lng

var map = L.map('map').setView([latitude, longitude], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([latitude, longitude]).addTo(map)
    .bindPopup(`${data.ip}`)
    .openPopup();
}

window.addEventListener('DOMContentLoaded', () => {
    getData()
})
