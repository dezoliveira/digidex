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

const backPage = () => {  
  if (pageNumber !== 0) {
    pageNumber = pageNumber - 1
    getDigimons()
  }

  return
}

const nextPage = () => {
  const showingPages = 5

  if (pageNumber < showingPages -1) {
    pageNumber = pageNumber + 1
    getDigimons()
  }

  return
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

	for (i=0; i <= showingPages -1; i++) {
    let activeClass = ''
    let disableClass = ''
    let pageId = i

    if (pageNumber === 0) {
      disableClass = 'disabled'
    }

    if (i === 0) {
      html +=`
        <li
          id="pageBack"
          class="${disableClass}"
          onclick="backPage(${pageId})">
            <
        </li>
      `
    }

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

    disableClass = ''

    if (pageNumber === showingPages -1) {
      disableClass = 'disabled'
    }
    
    if (i === showingPages -1) {
      html +=`
        <li
          id="pageNext"
          class="${disableClass}"
          onclick="nextPage(${pageId})"
        >
          >
        </li>
      `
    }
	}

  html += `
    </ul>
  `

	pagination.innerHTML = html
}

// Get Digi Status
const getDigitStatus = async (id) => {
  const request = await fetch(`https://digi-api.com/api/v1/digimon/${id}`)
	const data = await request.json()
  return data
}

const renderDigimons = (digimons) => {
	let html = ''
	console.log(digimons)

	if (digimons.length) {
		for (let d in digimons) {

			html += `
				<div id=${digimons[d].id} class="digi-card">
					<span class="digi-image">
						<a href=${digimons[d].href}>
							<img src="${digimons[d].image}" />
						</a>
					</span>
					<span class="digi-title">
						<h1>${digimons[d].name}</h1>	
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