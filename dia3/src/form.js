const input = document.querySelector('[ data-js = "input_name"]')

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
