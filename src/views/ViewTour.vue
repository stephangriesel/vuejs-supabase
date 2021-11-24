<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <div v-if="statusMsg || errorMsg" class="mb-10 p-4 rounded-md shadow-md bg-light-grey" >
      <p class="text-at-light-red">
        {{statusMsg}}
      </p>
      <p class="text-red-500"></p>
    </div>
    <div v-if="dataLoaded">
      <!-- Tour Info -->
      <div class="flex flex-col items-center p-8 rounded-md shadow-md bg-light-grey relative">
        <div v-if="user" class="flex absolute left-2 top-2 gap-x-2">
          <div class="h7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-red shadow-lg" @click="editMode">
            <img class="h-3.5 w-auto" src="@/assets/images/pencil.svg" alt="">
          </div>
          <div class="h7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-red shadow-lg">
            <img class="h-3.5 w-auto" src="@/assets/images/trash.svg" alt="">
          </div>
        </div>
        <img v-if="data.tourType === 'walk'" class="h-24" src="@/assets/images/walk.svg" alt="">
        <img v-else class="h-24" src="@/assets/images/bicycle.svg" alt="">
        <span class="mt-6 py-1.5 text-xs text-white bg-at-light-red rounded-lg shadow-md">
          {{data.tourType}}
        </span>
        <div class="w-full mt-6">
          <input v-if="edit" type="text" class="p-2 w-full text-gray-500 focus:outline-none" v-model="data.tourName" />
          <h1 v-else class="text-at-light-red text-2xl text-center">
            {{data.tourName}}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { supabase } from "../supabase/init";
import { useRoute } from "vue-router";
import store from '../store/index'

export default {
  name: "view-tour",
  setup() {
    // Create data / vars
    const data = ref(null);
    const dataLoaded = ref(null);
    const errorMsg = ref(null);
    const statusMsg = ref(null);
    const route = useRoute();
    const user = computed(() => store.state.user)

    // Get current Id of route
    const currentId = route.params.tourId;

    // Get tour data
    const getData = async () => {
      try {
        const { data: tours, error } = await supabase.from("tours").select("*").eq("id", currentId);
        if (error) throw error;
        data.value = tours[0];
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
    const edit = ref(null);

    const editMode = () => {
      edit.value = !edit.value
    }

    // Add exercise

    // Delete exercise

    // Update tour

    return {statusMsg, data, dataLoaded, errorMsg, edit, editMode, user};
  },
};
</script>
