<template>
    <header-container>
        <template #title>
            <h1 class="w-full text-4xl font-normal">Teams</h1>
        </template>
        <template v-slot:subtitle>
            <h2 class="my-4 w-full text-base font-light">It's awesome working here, why do you work with us?</h2>
        </template>
    </header-container>
</template>

<script>
import HeaderContainer from "@/components/Shared/HeaderContainer.vue"

export default {
    name: "TeamsView",
    components: { HeaderContainer }
}
</script>

