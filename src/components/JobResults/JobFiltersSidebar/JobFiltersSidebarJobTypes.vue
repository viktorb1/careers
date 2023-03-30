<template>
    <collapsible-accordion header="Job Types">
        <div class="mt-5">
            <fieldset>
                <ul class="flex flex-row flex-wrap">
                    <li class="h-8 w-1/2" v-for="jobType of UNIQUE_JOB_TYPES" :key="jobType">
                        <input :id="jobType" type="checkbox" class="mr-3" v-model="selectedJobTypes" :value="jobType"
                            @change="selectJobType" />
                        <label :for="jobType">{{ jobType }}</label>
                    </li>
                </ul>
            </fieldset>
        </div>
    </collapsible-accordion>
</template>


<script>
import { mapActions, mapState } from "pinia"
import { useJobsStore, UNIQUE_JOB_TYPES } from "@/stores/jobs"
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue"
import { useUserStore, ADD_SELECTED_JOB_TYPES } from "@/stores/user"

export default {
    name: "JobFiltersSidebarJobTypes",
    components: { CollapsibleAccordion },
    data() {
        return {
            selectedJobTypes: []
        }
    },
    computed: {
        ...mapState(useJobsStore, [UNIQUE_JOB_TYPES]),
    },
    methods: {
        ...mapActions(useUserStore, [ADD_SELECTED_JOB_TYPES]),
        selectJobType() {
            this.ADD_SELECTED_JOB_TYPES(this.selectedJobTypes)
            this.$router.push({ name: "JobResults" })
            console.log("HERE", this.selectedJobTypes)
        }
    }
}
</script>