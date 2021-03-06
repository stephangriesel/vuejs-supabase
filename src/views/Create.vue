<template>
    <div class="max-w-screen-md mx-auto px-4 py-10">
        <!-- Status Message -->
        <div class="mb-10 p-4 bg-light-grey rounded-md shadow-lg" v-if="statusMsg || errorMsg">
            <p class="text-at-light-red">
                {{statusMsg}}
            </p>
            <p class="text-red-500">
                {{errorMsg}}
            </p>
        </div>

        <!-- Create -->
        <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
            <!-- Form -->
            <form @submit.prevent="createTour" class="flex flex-col gap-y-5 w-full">
                <h1 class="text-2xl text-at-light-red">Add Tour</h1>

                <!-- Tour name -->
                <div class="flex flex-col">
                    <label class="mb-1 text-sm text-at-light-red" for="tour-name">
                        Tour Name
                    </label>
                    <input class="p-2 text-gray-500 focus:outline-none" id="tour-name" required type="text" v-model="tourName"/>
                </div>

                <!-- Tour Type -->
                <div class="flex flex-col">
                    <label class="mb-1 text-sm text-at-light-red" for="tour-type">
                        Tour Type
                    </label>
                    <select class="p-2 text-gray-500 focus:outline-none" id="tour-type" required @change="tourChange" v-model="tourType">
                        <option value="select-tour">Select Tour</option>
                        <option value="walk">Walk</option>
                        <option value="bike">Bike</option>
                        <option value="run">Run</option>
                    </select>
                </div>

                <!-- Walk Tour Inputs -->
                <div class="flex flex-col gap-y-4" v-if="tourType === 'walk'">
                    <div :key="index" class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row" v-for="(item, index) in activities">
                        <div class="flex flex-col md:w-1/3">
                            <label class="mb-1 text-sm text-at-light-red" for="activity-name">Activity</label>
                            <input class="p-2 w-full text-gray-500 focus:outline-none" required type="text" v-model="item.activity">
                        </div>
                        <div class="flex flex-col flex-1">
                            <label class="mb-1 text-sm text-at-light-red" for="activity-landmarks">Landmarks</label>
                            <input class="p-2 w-full text-gray-500 focus:outline-none" required type="text" v-model="item.landmarks">
                        </div>
                        <div class="flex flex-col flex-1">
                            <label class="mb-1 text-sm text-at-light-red" for="activity-facts">Facts</label>
                            <input class="p-2 w-full text-gray-500 focus:outline-none" required type="text" v-model="item.facts">
                        </div>
                        <div class="flex flex-col flex-1">
                            <label class="mb-1 text-sm text-at-light-red" for="activity-duration">Duration</label>
                            <input class="p-2 w-full text-gray-500 focus:outline-none" required type="text" v-model="item.duration">
                        </div>
                        <img alt="" class="h-4 w-auto absolute -left-5 cursor-pointer" @click="deleteActivity(item.id)" src="@/assets/images/trash.svg">
                    </div>
                    <button @click="addActivity" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-red duration-200 border-solid border-2 border-transparent hover:border-at-light-red hover:bg-white hover:text-at-light-red" type="button">Add Walk Tour</button>
                </div>

                <!-- Bike Tour Inputs -->
                <div class="flex flex-col gap-y-4" v-if="tourType === 'bike'">
                    <div :key="index" class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row" v-for="(item, index) in activities">
                        <div class="flex flex-col md:w-1/3">
                            <label class="mb-1 text-sm text-at-light-red" for="bike-type">Type</label>
                            <select id="bike-type" class="p-2 w-full text-gray-500 focus:outline-none" v-model="item.bikeType">
                              <option value="#">Select Type</option>
                              <option value="citybike">City Bike</option>
                              <option value="ebike">E-Bike</option>
                            </select>
                        </div>
                        <div class="flex flex-col flex-1">
                            <label class="mb-1 text-sm text-at-light-red" for="activity-landmarks">Landmarks</label>
                            <input class="p-2 w-full text-gray-500 focus:outline-none" required type="text" v-model="item.landmarks">
                        </div>
                        <div class="flex flex-col flex-1">
                            <label class="mb-1 text-sm text-at-light-red" for="activity-facts">Facts</label>
                            <input class="p-2 w-full text-gray-500 focus:outline-none" required type="text" v-model="item.facts">
                        </div>
                        <div class="flex flex-col flex-1">
                            <label class="mb-1 text-sm text-at-light-red" for="activity-duration">Duration</label>
                            <input class="p-2 w-full text-gray-500 focus:outline-none" required type="text" v-model="item.duration">
                        </div>
                        <img alt="" class="h-4 w-auto absolute -left-5 cursor-pointer" @click="deleteActivity(item.id)" src="@/assets/images/trash.svg">
                    </div>
                    <button @click="addActivity" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-red duration-200 border-solid border-2 border-transparent hover:border-at-light-red hover:bg-white hover:text-at-light-red" type="button">Add Bike Tour</button>
                </div>

                <button @click="addTour" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-red duration-200 border-solid border-2 border-transparent hover:border-at-light-red hover:bg-white hover:text-at-light-red" type="submit">Add Tour</button>

            </form>
        </div>
    </div>
</template>

<script>

import {ref} from "vue";
import {uid} from "uid";
import {supabase} from '../supabase/init';

export default {
  name: "create",
  setup() {
    // Create data
    const tourName = ref('')
    const tourType = ref('select-tour')
    const activities = ref([1])
    const statusMsg = ref(null)
    const errorMsg = ref(null)


    // Add tour
    const addActivity = () => {
        if (tourType.value === 'walk') {
            activities.value.push({
                id: uid(),
                tour: "",
                landmarks: "",
                facts: "",
                duration:"",
            });
            return
        }
        activities.value.push({
            id: uid(),
            bikeType: "",
            landmarks: "",
            facts:"",
            duration:"",

        })
    }

    // Delete activity
    const deleteActivity = (id) => {
        if (activities.value.length > 1){
            activities.value = activities.value.filter(activity => activity.id !== id );
            return;
        }
        errorMsg.value = "Error: Can not remove, need at least one activity";
        setTimeout(( ) => {
            errorMsg.value = false;
        }, 5000)
    }

    // Listens for changing of activity type input
    const tourChange = () => {
        activities.value = [];
        addActivity();

    }

    // Create tour
    const createTour = async () => {
        try{
            const {error} = await supabase.from('tours').insert([
                {
                    tourName: tourName.value,
                    tourType: tourType.value,
                    activities: activities.value,
                },
            ]);
            if(error) throw error;
            statusMsg.value = 'Success: Tour Created';
            tourName.value = null;
            tourType.value = 'select-tour';
            activities.value = [];
                        setTimeout(() => {
                statusMsg.value = false;
            },5000)
        }
        catch(error) {
            errorMsg.value = `Error: ${error.message}`;
            setTimeout(() => {
                errorMsg.value = false;
            },5000)
        }
    }

    return {tourName, tourType, activities, statusMsg, errorMsg, addActivity,tourChange, deleteActivity, createTour};
  },
};
</script>
