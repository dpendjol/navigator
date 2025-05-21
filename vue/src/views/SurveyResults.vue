<script setup lang="ts">
import {computed} from 'vue'
import Chart from 'primevue/chart';
import { Card, Select, Button } from 'primevue';
import { Form } from '@primevue/forms';
import axios from 'axios'

import { ref, onMounted } from "vue";
import { watch } from 'vue';
const axiosInstance = axios.create({baseURL: 'http://localhost:3000'})
const data = ref();

onMounted(async () => {
    data.value = (await axiosInstance.get('/survey/Team_1')).data
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const COLOR_MAP : {[key: string] : any} = {
    '1-1': '#3d405b',
    '1-2': '#50536b',
    '1-3': '#63667b',
    '1-4': '#77798c',
    '1-5': '#8a8c9c',
    '2-1': '#796647',
    '2-2': '#917a55',
    '2-3': '#a98e64',
    '2-4': '#c1a372',
    '2-5': '#d9b780',
    '3-1': '#703d2f',
    '3-2': '#864939',
    '3-3': '#9c5542',
    '3-4': '#b3614c',
    '3-5': '#c96d55',
    '4-1': '#33473d',
    '4-2': '#40594d',
    '4-3': '#4d6a5c',
    '4-4': '#5a7c6b',
    '4-5': '#678e7b',
    'nvt': '#ffffff'
}

const computedData = computed(() => {
        let averageDataInfo = Array(20).fill(0)
        const datasets = data.value.map((item : any, index : number) => {
            let section = 1
            const colors = item.values.map((item : any, index : number) => {
                if (index === 5) section = 2
                if (index === 10) section = 3
                if (index === 15) section = 4
                averageDataInfo[index] += parseInt(item, 10);
                return COLOR_MAP[section + '-' + item]
            })

            return {
                        label: 'Person ' + index,
                        data: Array(20).fill('1'),
                        backgroundColor: colors,
                        borderWidth: 0,
                    }
        })
            
        let section = 1
        const averageData = averageDataInfo.map((item, index) => {
            item = Math.round(item / data.value.length)
            if (index === 5) section = 2
            if (index === 10) section = 3
            if (index === 15) section = 4
            return COLOR_MAP[section + '-' + item]
        })

        datasets.reverse().push({
            label: 'average',
            data: Array(20).fill('1'),
            backgroundColor: averageData, //Array(20).fill('').map((_, index) => index % 2 === 0 ? '#ff22FF' : '#22ff22'),
            borderWidth: 0,
        })
        return datasets
    }
)

const setChartData = () => {
    return {
        datasets: computedData.value
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        plugins: {
            legend: {
                display: false,
                labels: {
                    color: textColor
                },
            },
            tooltip: {
                enabled: false
            }
        },
    };
}

const initialValues = ref({
    team: { name: '' }
});

const teams = ref([
    { name: 'Team 1', code: 'Team_1' },
    { name: 'Team 2', code: 'Team_2' },
    { name: 'Team 3', code: 'Team_3' },
    { name: 'Team 4', code: 'Team_4' },
    { name: 'Team 5', code: 'Team_5' }
]);

const selection = ref({name: 'Team 1', code: 'Team_1'})
const title = ref('')
const onFormSubmit = async ({ values } : any) => {
    title.value = values.team.name;
    data.value = (await axiosInstance.get('/survey/' + values.team.code)).data
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
}

watch(() => selection.value, (item) => {
    onFormSubmit({values: {team: {name: item.name, code: item.code}}})
})
</script>

<template>
    <div class="w-1/2 justify-self-center m-12">
        <Toast />
        <div class="flex flex-col">
            <!-- @vue-ignore -->
            <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full ">
                <div class="flex flex-col gap-1">
                    <Select v-model="selection" name="team" :options="teams" optionLabel="name" placeholder="Select a Team" />
                    <!-- @vue-ignore -->
                    <Message v-if="$form.team?.name?.invalid" severity="error" size="small" variant="simple">{{ //@ts-ignore 
                    $form.team.name.error?.message }}</Message>
                </div>
            </Form>

            <Card>
                <template #title>{{ title }}</template>
                <template #content>
                    <Chart type="pie" :data="chartData" :options="chartOptions" />
                </template>
            </Card>
        </div>
    </div>
</template>