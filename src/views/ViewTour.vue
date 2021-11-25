<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
        <div class="mb-10 p-4 rounded-md shadow-md bg-light-grey" v-if="statusMsg || errorMsg">
            <p class="text-at-light-red">
                {{statusMsg}}
            </p>
            <p class="text-red-500">
                {{ errorMsg }}
            </p>
        </div>
        <div v-if="dataLoaded">
            <!-- Tour Info -->
            <div class="flex flex-col items-center p-8 rounded-md shadow-md bg-light-grey relative">
                <div class="flex absolute left-2 top-2 gap-x-2" v-if="user">
                    <div @click="editMode" class="h7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-red shadow-lg">
                        <img alt="" class="h-3.5 w-auto" src="@/assets/images/pencil.svg">
                    </div>
                    <div @click="deleteTour" class="h7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-red shadow-lg">
                        <img alt="" class="h-3.5 w-auto" src="@/assets/images/trash.svg">
                    </div>
                </div>
                <img alt="" class="h-24" src="@/assets/images/walk.svg" v-if="data.tourType === 'walk'">
                <img alt="" class="h-24" src="@/assets/images/bicycle.svg" v-else>
                <span class="mt-6 py-1.5 text-xs text-white bg-at-light-red rounded-lg shadow-md">
                    {{data.tourType}}
                </span>
                <div class="w-full mt-6">
                    <input class="p-2 w-full text-gray-500 focus:outline-none" type="text" v-if="edit" v-model="data.tourName"/>
                    <h1 class="text-at-light-red text-2xl text-center" v-else>
                        {{data.tourName}}
                    </h1>
                </div>
            </div>

            <!-- Activity Info -->
            <div class="mt-10 p-8 rounded-md flex flex-col item-center bg-light-grey shadow-md">
                <!-- Bike Info -->
                <div class="flex flex-col gap-y-4 w-full" v-if="data.tourType === 'bike'">
                    <div :key="index" class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row" v-for="(item,index) in data.activities">
                        <div class="flex flex-2 flex-col md:w-1/3">
                            <label class="mb-1 text-at-light-red" for="activity-name">
                                Activity
                            </label>
                            <input class="p-2 w-full text-gray-500 focus:outline-none" id="activity-name" type="text" v-if="edit" v-model="item.activity"/>
                            <p v-else>{{item.activity}}</p>
                        </div>
                        <div class="flex flex-1 flex-col">
                            <label class="mb-1 text-at-light-red" for="landmarks">
                                Landmarks
                            </label>
                            <input class="p-2 w-full text-gray-500 focus:outline-none" id="landmarks" type="text" v-if="edit" v-model="item.landmarks"/>
                            <p v-else>{{item.landmarks}}</p>
                        </div>
                        <div class="flex flex-1 flex-col">
                            <label class="mb-1 text-at-light-red" for="facts">
                                Facts
                            </label>
                            <input class="p-2 w-full text-gray-500 focus:outline-none" id="facts" type="text" v-if="edit" v-model="item.facts"/>
                            <p v-else>{{item.facts}}</p>
                        </div>
                        <div class="flex flex-1 flex-col">
                            <label class="mb-1 text-at-light-red" for="duration">
                                Duration
                            </label>
                            <input class="p-2 w-full text-gray-500 focus:outline-none" id="duration" type="text" v-if="edit" v-model="item.duration"/>
                            <p v-else>{{item.duration}}</p>
                        </div>
                        <img @click="deleteActivity(item.id)" alt="" class="absolute h-4 w-auto -left-5 cursor-pointer" src="@/assets/images/trash.svg" v-if="edit">
                    </div>
                    <button @click="addActivity" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-red duration-200 border-solid border-2 border-transparent hover:border-at-light-red hover:bg-white hover:text-at-light-red" type="button" v-if="edit">Add Activity</button>
                </div>
                <!-- Walk Info -->
                <div class="flex flex-col gap-y-4 w-full" v-else>
                    <div :key="index" class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row" v-for="(item,index) in data.activities">
                        <div class="flex flex-2 flex-col md:w-1/3">
                            <label class="mb-1 text-at-light-red" for="bikeType">
                                Type
                            </label>
                            <select class="p-2 w-full text-gray-500 focus:outline-none" id="bikeType" type="text" v-if="edit" v-model="item.bikeType">
                                <option value="select-tour">Select Tour</option>
                                <option value="walk">Walk</option>
                                <option value="bike">Bike</option>
                                <option value="run">Run</option>
                            </select>
                            <p v-else>{{item.bikeType}}</p>
                        </div>
                        <div class="flex flex-1 flex-col">
                            <label class="mb-1 text-at-light-red" for="landmarks">
                                Landmarks
                            </label>
                            <input class="p-2 w-full text-gray-500 focus:outline-none" id="landmarks" type="text" v-if="edit" v-model="item.landmarks"/>
                            <p v-else>{{item.landmarks}}</p>
                        </div>
                        <div class="flex flex-1 flex-col">
                            <label class="mb-1 text-at-light-red" for="facts">
                                Facts
                            </label>
                            <input class="p-2 w-full text-gray-500 focus:outline-none" id="facts" type="text" v-if="edit" v-model="item.facts"/>
                            <p v-else>{{item.facts}}</p>
                        </div>
                        <div class="flex flex-1 flex-col">
                            <label class="mb-1 text-at-light-red" for="duration">
                                Duration
                            </label>
                            <input class="p-2 w-full text-gray-500 focus:outline-none" id="duration" type="text" v-if="edit" v-model="item.duration"/>
                            <p v-else>{{item.duration}}</p>
                        </div>
                        <img @click="deleteActivity(item.id)" alt="" class="absolute h-4 w-auto -left-5 cursor-pointer" src="@/assets/images/trash.svg" v-if="edit">
                    </div>
                    <button @click="addActivity" class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-red duration-200 border-solid border-2 border-transparent hover:border-at-light-red hover:bg-white hover:text-at-light-red" type="button" v-if="edit">Add Activity</button>
                </div>
            </div>
            <button @click="update" class="mt-10 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-red duration-200 border-solid border-2 border-transparent hover:border-at-light-red hover:bg-white hover:text-at-light-red" type="button" v-if="edit">Update Activity</button>
        </div>
    </div>
</template>

<script>
import { ref, computed } from "vue";
import { supabase } from "../supabase/init";
import { useRoute, useRouter } from "vue-router";
import store from '../store/index'
import {uid} from 'uid'

export default {
  name: "view-tour",
  setup() {
    // Create data / vars
    const data = ref(null);
    const dataLoaded = ref(null);
    const errorMsg = ref(null);
    const statusMsg = ref(null);
    const route = useRoute();
    const router = useRouter();
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
    const deleteTour = async () => {
        try{
            const {error} = await supabase.from('tours').delete().eq('id',currentId);
            if (error) throw error;
            router.push({name: "Home"})
        }
        catch(error){
            errorMsg.value = `Error: ${error.message}`
            setTimeout(() => {
                errorMsg.value = false
            }, 5000)
        }
    }

    // Edit mode
    const edit = ref(null);

    const editMode = () => {
      edit.value = !edit.value
    }

    // Add activity
    const addActivity = () => {
        if (data.value.tourType === 'walk') {
            data.value.activities.push({
                id: uid(),
                tour: "",
                landmarks: "",
                facts: "",
                duration:"",
            });
            return
        }
        data.value.activities.push({
            id: uid(),
            bikeType: "",
            landmarks: "",
            facts:"",
            duration:"",

        })
    }

    // Delete activity
        const deleteActivity = (id) => {
        if (data.value.activities.length > 1){
            data.value.activities = data.value.activities.filter((activity) => activity.id !== id );
            return;
        }
        errorMsg.value = "Error: Can not remove, need at least one activity";
        setTimeout(( ) => {
            errorMsg.value = false;
        }, 5000)
    }

    // Update tour
    const update = async () => {
        try {
            const {error} = await supabase.from('tours').update({
                tourName: data.value.tourName,
                activities: data.value.activities
            }).eq(`id`, currentId);
            if(error) throw console.error;
            edit.value = false;
            statusMsg.value = "Success: Tour Updated"
            setTimeout(() => {
                statusMsg.value = false
            },5000)
        }
        catch (error) {
            errorMsg.value `Error: ${error.message}`;
            setTimeout(() => {
                errorMsg.value = false
            },5000)
        }
    }

    return {statusMsg, data, dataLoaded, errorMsg, edit, editMode, user, deleteTour, addActivity, deleteActivity, update};
  },
};
</script>
