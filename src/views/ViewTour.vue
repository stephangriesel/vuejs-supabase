<template>
  <div></div>
</template>

<script>
import { ref } from "vue";
import { supabase } from "../supabase/init";
import { useRoute } from "vue-router";

export default {
  name: "view-tour",
  setup() {
    // Create data / vars
    const data = ref(null);
    const dataLoaded = ref(null);
    const errorMsg = ref(null);
    const statusMsg = ref(null);
    const route = useRoute();

    // Get current Id of route
    const currentId = route.params.tourId;

    // Get tour data
    const getData = async () => {
      try {
        const { data: tours, error } = await supabase.from("tours").select("*").eq("id", currentId);
        if (error) throw error;
        data.value = tours;
        dataLoaded.value = true;
        console.log("get tour data", data.value)
      } catch (error) {
        errorMsg.value = error.errorMsg
        setTimeout(() => {
          errorMsg.value = false
        }, 5000)
      }
    };

    getData();
    

    // Delete tour

    // Edit mode

    // Add exercise

    // Delete exercise

    // Update tour

    return {statusMsg};
  },
};
</script>
