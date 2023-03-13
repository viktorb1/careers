<template>
  <button :class="buttonClass">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'ActionButton',
  props: {
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    buttonClass() {
      return {
        [this.type]: true // {'primary': true}
      }
    }
  }
}
</script>

<style scoped>
button {
  @apply rounded px-5 py-3 font-medium;
}

.primary {
  @apply border-0 bg-brand-blue-1 text-white hover:shadow-blue;
}

.secondary {
  @apply bg-transparent text-brand-blue-1 hover:bg-brand-blue-2 hover:text-white;
}
</style>
