<template>
  <div class="flex w-full flex-row flex-nowrap">
    <job-filters-sidebar />
    <job-listings />
  </div>
</template>

<script>
import JobFiltersSidebar from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue'
import JobListings from '@/components/JobResults/JobListings.vue'

export default {
  name: 'JobResultsView',
  components: {
    JobFiltersSidebar,
    JobListings
  },
  computed: {
    experiment() {
      console.log(this.$router)
      return 'Irrelevant'
    }
  },
  methods: {
    goToHome() {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
