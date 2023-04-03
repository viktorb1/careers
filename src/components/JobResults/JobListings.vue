<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link role="link" v-if="previousPage" :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1">
            Previous
          </router-link>
          <router-link v-if="nextPage" role="link" :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1">
            Next
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import JobListing from '@/components/JobResults/JobListing.vue'
import { useJobsStore } from "@/stores/jobs"
import { computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages"
import { useDegreesStore } from '@/stores/degrees'

const jobsStore = useJobsStore()
const route = useRoute()
const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS)
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10))
const currentPage = computed(() => Number.parseInt(route.query.page as string || '1'))

const { previousPage, nextPage } = usePreviousAndNextPages(currentPage, maxPage)


const displayedJobs = computed(() => {
  const pageNumber = currentPage.value
  const firstJobIndex = (pageNumber - 1) * 10
  const lastJobIndex = pageNumber * 10
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex)
})


const degreesStore = useDegreesStore()

onMounted(() => jobsStore.FETCH_JOBS())
onMounted(degreesStore.FETCH_DEGREES)

</script>
