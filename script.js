const gridContainer = document.getElementById('grid-container')
const pagination = document.getElementById("pagination")

let pageNumber = 0
let digimons = []

const swapPagination = (pageId, back, next) => {
  console.log(back)
  console.log(next)
  pageNumber = pageId
  getDigimons()
}

const createPagination = (pageable) => {
	let html = ''
	const { totalPages, elementsOnPage } = pageable
	const paginationLength = totalPages / elementsOnPage
	const showingPages = 5

	console.log(paginationLength)

  html += `
    <ul>
  `

	html += `
		<li> < </li>
	`

	for (i=0; i <= showingPages -1; i++) {
    let activeClass = ''
    let pageId = i

    if (i === pageNumber){
      activeClass = 'active'  
    }

		html += `
			<li
        id=page-${pageId}
        class="${activeClass}"
        onclick="swapPagination(${pageId})">
          ${i+1}
      </li>
		`
	}

	html += `
		<li> > </li>
	`

  html += `
    </ul>
  `

	pagination.innerHTML = html
}

const renderDigimons = (digimons) => {
	let html = ''
	console.log(digimons)

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

	gridContainer.innerHTML = html
}

const getDigimons = async () => {
	const request = await fetch(`https://digi-api.com/api/v1/digimon?page=${pageNumber}`)
	const data = await request.json()

  if (data) {
    digimons = data.content
    renderDigimons(digimons)
    createPagination(data.pageable)
  }
	
}

getDigimons()