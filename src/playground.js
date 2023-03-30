const { ref, computed } = require('vue')

let name = ref('Viktor')
const title = computed(() => name.value + ' the Great')

name.value = 'Peter'
console.log(title.value)
