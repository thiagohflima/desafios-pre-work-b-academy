const form = document.querySelector('[data-js = "form_cars"]')
const table = document.querySelector('[data-js = "table"]')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const image = e.target.elements['image']
  const brand = e.target.elements['brand']
  const year = e.target.elements['year']
  const plate = e.target.elements['plate']
  const color = e.target.elements['color']

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

  image.value = ''
  brand.value = ''
  year.value = ''
  plate.value = ''
  color.value = ''

  image.focus()

  table.appendChild(tr)

})
