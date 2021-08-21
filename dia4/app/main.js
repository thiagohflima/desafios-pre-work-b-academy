import './style.css'

const URL = 'http://localhost:3333/cars'

async function getCars() {

  let data
  try {
    const response = await fetch(URL)
    data = await response.json()
  }
  catch (error) {
    console.log('Erro: GET carros')
    return
  }

  if (data.length === 0) {
    const td = document.querySelector('[data-js = "table_error"]')
    td.innerText = 'Nenhum carro encontrado'
  } else {
    td.style.display = 'none'

    data.forEach(car => {
      insertRowOfCar(car.image, car.brandModel, car.year, car.plate, car.color)
    })
  }
}

getCars()

const form = document.querySelector('[data-js = "form_cars"]')
const table = document.querySelector('[data-js = "table"]')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const image = e.target.elements['image']
  const brand = e.target.elements['brand']
  const year = e.target.elements['year']
  const plate = e.target.elements['plate']
  const color = e.target.elements['color']

  insertRowOfCar(image, brand, year, plate, color)

  image.value = ''
  brand.value = ''
  year.value = ''
  plate.value = ''
  color.value = ''

  image.focus()
})

function insertRowOfCar(image, brand, year, plate, color) {
  const tr = document.createElement('tr')

  const tdImage = document.createElement('td')
  tdImage.innerText = image.value
  const tdBrand = document.createElement('td')
  tdBrand.innerText = brand.value
  const tdYear = document.createElement('td')
  tdYear.innerText = year.value
  const tdPlate = document.createElement('td')
  tdPlate.innerText = plate.value
  const tdColor = document.createElement('td')
  tdColor.innerText = color.value

  tr.appendChild(tdImage)
  tr.appendChild(tdBrand)
  tr.appendChild(tdYear)
  tr.appendChild(tdPlate)
  tr.appendChild(tdColor)

  table.appendChild(tr)
}


