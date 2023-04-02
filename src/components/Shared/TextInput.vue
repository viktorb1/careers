<template>
  <input :value="modelValue" type="text" placeholder="Los Angeles"
    class="w-full bg-transparent text-lg font-normal focus:outline-none" @input="handleInput" />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const handleInput = ($event: Event) => {
  const target = $event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

</script>
