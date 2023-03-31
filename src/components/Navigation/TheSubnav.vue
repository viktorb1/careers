<template>
  <div class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onJobsResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span><span class="text-brand-green-1">{{ FILTERED_JOBS.length }} </span> jobs
          matched</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { mapState } from "pinia"

import { useJobsStore } from "@/stores/jobs"
import { computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const onJobsResultsPage = computed(() => {
  return route.name === 'JobResults'
})

const jobsStore = useJobsStore()
const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS)

</script>
