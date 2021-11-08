<template>
    <div class="max-w-screen-sm mx-auto px-4 py-10">
        <!-- Error Handling -->
        <div class="mb-10 p-4 rounded-md bg-light-grey shadown-lg" v-if="errorMsg">
            <p class="text-red-500">{{errorMsg}}</p>
        </div>

        <!-- Registration  -->
        <form @submit.prevent="register" class="p-8 flex-col bg-light-grey rounded-md shadown-lg">
            <h1 class="text-3xl text-at-light-red mb-4">Register</h1>

            <div class="flex flex-col mb-2">
                <label class="mb-1 text-sm text-at-light-red" for="email">
                    Email
                </label>
                <input class="p-2 text-gray-500 focus:outline-none" id="email" required type="text" v-model="email"/>
            </div>

            <div class="flex flex-col mb-2">
                <label class="mb-1 text-sm text-at-light-red" for="password">
                    Password
                </label>
                <input class="p-2 text-gray-500 focus:outline-none" id="password" required type="password" v-model="password"/>
            </div>

            <div class="flex flex-col mb-2">
                <label class="mb-1 text-sm text-at-light-red" for="confirmPassword">
                    Confirm Password
                </label>
                <input class="p-2 text-gray-500 focus:outline-none" id="confirmPassword" required type="password" v-model="confirmPassword"/>
            </div>

            <button class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-red duration-200 border-solid border-2 border-transparent hover:border-at-light-red hover:bg-white hover:text-at-light-red" type="submit">Register</button>

            <router-link :to="{name: 'Login'}" class="text-sm ml-2 text-center">Already have an account?
                <span class="text-at-light-red">Login</span>
            </router-link>
        </form>
    </div>
</template>

<script>
import {ref} from "vue";
import {supabase} from '../supabase/init';
import {useRouter} from 'vue-router';
export default {
  name: "register",
  setup() {
    // Create data / vars
    const router = useRouter();
    const email = ref(null);
    const password = ref(null);
    const confirmPassword = ref(null);
    const errorMsg = ref(null);
    // Register function

    const register = async () => {
        if (password.value === confirmPassword.value) {
            try {
                const {error} = await supabase.auth.signUp({
                    email: email.value,
                    password: password.value,
                });
                if(error) throw error;
                router.push({name: "Login"})
            }
            catch(error){
                errorMsg.value = error.message;
                setTimeout(() => {
                errorMsg.value = null;
                }, 5000)
            }
            return;
        }
        errorMsg.value = "Whoops, double check the confirmed password 😵 ";
        setTimeout(() => {
            errorMsg.value = null;
        }, 5000)
    }

    return {email, password, confirmPassword,errorMsg, register};
  },
};
</script>
