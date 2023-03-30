<template>
    <collapsible-accordion header="Organizations">
        <div class="mt-5">
            <fieldset>
                <ul class="flex flex-row flex-wrap">
                    <li class="h-8 w-1/2" v-for="organization of UNIQUE_ORGANIZATIONS" :key="organization">
                        <input :id="organization" type="checkbox" class="mr-3" v-model="selectedOrganizations"
                            :value="organization" @change="selectOrganization" />
                        <label :for="organization">{{ organization }}</label>
                    </li>
                </ul>
            </fieldset>
        </div>
    </collapsible-accordion>
</template>


<script>
import { mapActions, mapState } from "pinia"
import { useJobsStore, UNIQUE_ORGANIZATIONS } from "@/stores/jobs"
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue"
import { useUserStore, ADD_SELECTED_ORGANIZATIONS } from "@/stores/user"

export default {
    name: "JobFiltersSidebarOrganizations",
    components: { CollapsibleAccordion },
    data() {
        return {
            selectedOrganizations: []
        }
    },
    computed: {
        ...mapState(useJobsStore, [UNIQUE_ORGANIZATIONS]),
    },
    methods: {
        ...mapActions(useUserStore, [ADD_SELECTED_ORGANIZATIONS]),
        selectOrganization() {
            this.ADD_SELECTED_ORGANIZATIONS(this.selectedOrganizations)
            this.$router.push({ name: "JobResults" })
            console.log(this.selectedOrganizations)
        }
    }
}
</script>