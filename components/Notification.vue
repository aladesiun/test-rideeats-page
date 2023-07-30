<template>
<transition name="slide-fade">
    <div class="notification-cont z-40 text-white text-center text-sm" v-if="notification.type > 0">
        <div class="bg-green-500 p-5 rounded-lg" role="alert" v-if="notification.type == 1">
            {{ notification.message }}
        </div>
        <div class="bg-red-500 p-5 rounded-lg" role="alert" v-if="notification.type == 2">
            {{ notification.message }}
        </div>
    </div>
</transition>
</template>

<script lang="ts">
import { useNotificationStore } from '../store/notification'
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const store = useNotificationStore();
        const notification = store.notification;
        return {
            notification,
        }
    }
})
</script>

<style scoped>
.notification-cont {
    position: fixed;
    top: 20%;
    z-index: 9999;
    top: 7%;
    width: 500px;
    right: 50%;
    transform: translateX(50%);

}
</style>