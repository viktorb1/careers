<template>
  <div class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onJobsResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span><span class="text-brand-green-1">{{ this.FILTERED_JOBS.length }} </span> jobs
          matched</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia"

import { useJobsStore, FILTERED_JOBS } from "@/stores/jobs"
export default {
  name: 'TheSubnav',
  computed: {
    onJobsResultsPage() {
      return this.$route.name === 'JobResults'
    },
    ...mapState(useJobsStore, [FILTERED_JOBS]),
  }
}
</script>
