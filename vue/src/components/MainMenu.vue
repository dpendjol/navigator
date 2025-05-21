<script setup lang="ts">
    import { ref } from 'vue';
    import { Menubar } from 'primevue';
    import router from '@/router';

    const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => router.push('/')
    },
    {
        label: 'Take Survey',
        icon: 'pi pi-file-edit',
        command: () => router.push('/takesurvey')
    },
    {
        label: 'Survey Results',
        icon: ' pi pi-chart-pie',
        command: () => router.push('/survey')
    }
]);
</script>

<template>
    <Menubar :model="items"></Menubar>
</template>