const input = document.querySelector('[data-js = "input_name"]')

const exceptions = ['da', 'de', 'do', 'dos']

input.addEventListener('input', (e) => {
  const splitedNames = e.target.value.split(' ')

  e.target.value = splitedNames.map((name) => {

    if (exceptions.includes(name.toLowerCase()))
      return name.toLowerCase()
    else
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

  }).join(' ')
})

const form = document.querySelector('[data-js = "form"]')
const select = document.createElement('select')
const colors = ['red', 'blue', 'yellow', 'green', 'black']

select.setAttribute('multiple', '')
form.appendChild(select)

colors.forEach(color => {
  const option = document.createElement('option')
  option.value = option.textContent = color
  select.appendChild(option)
})

const div = document.createElement('div')
div.style.display = 'flex'
form.appendChild(div)

function createSquare(color) {
  const squareColorized = document.createElement('div')
  squareColorized.style.width = '100px'
  squareColorized.style.height = '100px'
  squareColorized.style.background = color
  div.appendChild(squareColorized)
}

select.addEventListener('change', (e) => {
  div.innerHTML = ''
  Array.from(e.target.selectedOptions).map(option => {
    createSquare(option.value)
  })
})
