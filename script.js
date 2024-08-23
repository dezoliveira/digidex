const gridContainer = document.getElementById('grid-container')

let pageNumber = 0
let digimons = []

const renderDigimons = (digimons) => {
	let html = ''
	console.log(digimons)

	// html += "<ul>"

	if (digimons.length) {
		for (let d in digimons) {
			html += `
				<div id=${digimons[d].id}>
					<span class="digiImage">
						<a href=${digimons[d].href}>
							<img src="${digimons[d].image}" />
						</a>
					</span>
					<span>
						<h2>${digimons[d].name}</h2>	
					</span>
				</div>
			`
		}
	}

	// html += "</ul>"

	gridContainer.innerHTML = html
}

const getDigimons = async () => {
	const request = await fetch(`https://digi-api.com/api/v1/digimon?page=${pageNumber}`)
	const data = await request.json()

	digimons = data.content
	
	renderDigimons(digimons)
}

getDigimons()