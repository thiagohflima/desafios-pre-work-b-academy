import './style.css'

const URL = 'http://localhost:3333/cars'

async function getCars() {

  let data
  try {
    const response = await fetch(URL)
    data = await response.json()
  }
  catch (error) {
    console.log('Erro: GET carros: ', error)
    return
  }

  await manageButtons(data)

}

async function deleteCar(plate) {
  try {
    const response = await fetch(URL, {
      method: 'DELETE',
      body: JSON.stringify({
        plate
      }),
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.log('Erro: DELETE carros: ', error)
    return
  }
}

async function postCar(image, brandModel, year, plate, color) {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify({
        image,
        brandModel,
        year,
        plate,
        color
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    const span = document.querySelector('[data-js = "span_error"]')

    if (response.ok) {

      let data = []
      data.push({
        image, brandModel, year, plate, color
      })

      await manageButtons(data)

      span.style.color = '#00a000'
      span.innerHTML = `<b>SUCESSO:</b> Informações inseridas corretamente.`
    } else {
      const span = document.querySelector('[data-js = "span_error"]')
      span.style.color = '#900020'

      if (image === '' || brandModel === '' || year === '' || plate === '' || color === '') {
        span.innerHTML = `<b>ERRO:</b> Algum campo ficou em branco.`
      } else {
        span.innerHTML = `<b>ERRO:</b> Você não pode cadastrar uma placa que já está cadastrada.`
      }
    }

  } catch (error) {
    console.log('Erro: POST carros: ', error)
    return
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

  postCar(image.value, brand.value, year.value, plate.value, color.value)

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
  tdImage.innerText = image
  const tdBrand = document.createElement('td')
  tdBrand.innerText = brand
  const tdYear = document.createElement('td')
  tdYear.innerText = year
  const tdPlate = document.createElement('td')
  tdPlate.innerText = plate
  const tdColor = document.createElement('td')
  tdColor.innerText = color
  const tdButton = document.createElement('td')
  const button = document.createElement('button')
  button.innerText = 'Excluir'
  button.setAttribute('data-js', 'button_delete')
  button.setAttribute('data-plate', plate)
  tdButton.appendChild(button)

  tr.appendChild(tdImage)
  tr.appendChild(tdBrand)
  tr.appendChild(tdYear)
  tr.appendChild(tdPlate)
  tr.appendChild(tdColor)
  tr.appendChild(tdButton)

  table.appendChild(tr)

  return document.querySelectorAll('[data-js = "button_delete"]')
}

function verifyIfTableIsEmpty() {
  const td = document.querySelector('[data-js = "table_error"]')

  if (table.childElementCount <= 1) {
    td.innerText = 'Nenhum carro encontrado'
    td.style.display = ''
    return 1
  } else {
    td.style.display = 'none'
    return 0
  }
}

async function manageButtons(data) {
  let allButtons
  let i = 0

  data.forEach(car => {

    allButtons = insertRowOfCar(car.image, car.brandModel, car.year, car.plate, car.color)
    if (++i === data.length) {
      allButtons.forEach((row) => row.addEventListener('click', e => {
        const plate = e.target.getAttribute('data-plate')
        deleteCar(plate)
        e.target.parentNode.parentNode.remove()
      }))
    }

  })

  verifyIfTableIsEmpty()
}
