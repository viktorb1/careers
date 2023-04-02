import { computed, type Ref } from 'vue'

const usePreviousAndNextPages = (currentPageValue: Ref<number>, maxPageValue: Ref<number>) => {
  const previousPage = computed(() => {
    const previousPage = currentPageValue.value - 1
    const firstPage = 1
    return previousPage >= firstPage ? previousPage : undefined
  })

  const nextPage = computed(() => {
    const nextPage = currentPageValue.value + 1
    return nextPage <= maxPageValue.value ? nextPage : undefined
  })

  return { previousPage, nextPage }
}

export default usePreviousAndNextPages
