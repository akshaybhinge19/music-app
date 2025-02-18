export default {
  beforeMount(el, binding) {
    let iconClass = `fas fa-${binding.value.icon} text-2xl`

    if (binding.value.right) {
      iconClass += ' float-right'
    }

    if (binding.value.yellow) {
      iconClass += ' text-yellow-400'
    } else {
      iconClass += ' text-green-400'
    }
    el.innerHTML += `<i class="${iconClass}"></i>`
  }
}
