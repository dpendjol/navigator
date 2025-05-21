<script setup lang="ts">
import { ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { Toast, Button, Message, RadioButton, RadioButtonGroup, Divider, Select } from 'primevue'
import { Form } from '@primevue/forms';
import { onMounted } from 'vue';

import axios from 'axios';
import router from '@/router';
const toast = useToast();

const initialValues = ref({});

const teams = ref([
    { name: 'Team 1', code: 'Team_1' },
    { name: 'Team 2', code: 'Team_2' },
    { name: 'Team 3', code: 'Team_3' },
    { name: 'Team 4', code: 'Team_4' },
    { name: 'Team 5', code: 'Team_5' }
]);

const resolver = ({ values } : any) => {
    const errors : any = {};

    if (!values.team) {
        errors.team = [{ message: 'Teamname is required.' }];
    }

    for (const [key, value] of Object.entries(values)) {
        if ('team' === key) {
            continue
        }
        if (!value) {
            errors[key] = [{ message: 'Please make a choice' }]
        }
    }

    return {
        values, // (Optional) Used to pass current form values to submit event.
        errors
    };
};

onMounted(() => {
})

const loading = ref(false)

const onFormSubmit = async ({ valid, values } : any) => {
    loading.value = true;
    if (!valid) {
        toast.add({
            severity: 'error',
            summary: 'Form did not submit, please check issues',
            life: 3000
        });
        return;
    } 

    const requestData : any = {entry: '', values: []}
    for (const [key, value] of Object.entries<any>(values)) {
        if (key === 'team') {
            requestData['entry'] = value.code;
            continue;
        }

        requestData['values'].push(value);
    }

    try {
        const axiosInstance = axios.create({baseURL: 'http://localhost:3000'})
        const {data} = await axiosInstance.post('/survey', JSON.stringify(requestData),{
        headers: {
          'Content-Type': 'application/json'
        }
        })
    } catch {

    } finally {
        loading.value = false
        router.push({name: 'survey'});
    }

};

const questions = ref([
{
  name: 'question',
  question:'Ik voel me psychologisch veilig in mijn team.'
  },
{
  name: 'question',
  question:'Ik zoek actief naar innovatieve lesideeën.'
  },
{
  name: 'question',
  question:'Feedback geven en ontvangen gaat ons team gemakkelijk af.'
  },
{
  name: 'question',
  question:'We hebben gedeelde doelen die duidelijk zijn.'
  },
{
  name: 'question',
  question:'Ik voel me eigenaar van de resultaten van mijn team.'
  },
{
  name: 'question',
  question:'We benutten elkaars expertise optimaal.'
  },
{
  name: 'question',
  question:'Onze communicatie is open en eerlijk.'
  },
{
  name: 'question',
  question:'Ik pas mijn lessen regelmatig aan op basis van feedback.'
  },
{
  name: 'question',
  question:'Ons team leert van fouten.'
  },
{
  name: 'question',
  question:'Ik voel me gesteund door mijn leidinggevende.'
  },
{
  name: 'question',
  question:'We vieren team­successen bewust.'
  },
{
  name: 'question',
  question:'Er is ruimte voor afwijkende meningen.'
  },
{
  name: 'question',
  question:'Ik experimenteer met nieuwe werkvormen.'
  },
{
  name: 'question',
  question:'Onze vergaderingen zijn efficiënt en productief.'
  },
{
  name: 'question',
  question:'Ik voel me verantwoordelijk voor de leerresultaten van alle leerlingen.'
  },
{
  name: 'question',
  question:'We hebben duidelijke afspraken over taakverdeling.'
  },
{
  name: 'question',
  question:'Ik voel me energiek na teamoverleg.'
  },
{
  name: 'question',
  question:'Ons team past beslissingen snel toe in de praktijk.'
  },
{
  name: 'question',
  question:'Ik voel me gehoord tijdens teamdiscussies.'
  },
{
  name: 'question',
  question:'Onze teamcultuur stimuleert continue verbetering.'
  },    
])

const compQuestions = computed(() => {
    return questions.value.map((item, index) => {
        return {
            ...item,
            name: 'question' + index
        }
    })
})
</script>

<template>
    <div class="card flex justify-center m-12">
        <Toast />
        <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full ">
            <div class="flex flex-col gap-1">
                <Select name="team" :options="teams" optionLabel="name" placeholder="Select a Team" />
                <!-- @vue-ignore -->
                <!-- @vue-ignore -->
                <Message v-if="$form.team?.name?.invalid" severity="error" size="small" variant="simple">{{ //@ts-ignore
                $form.team.name.error?.message }}</Message>
            </div>
                    <Divider />
                    <template v-for="question, index in compQuestions">  
                        <div class="flex items-cemter gap-2">
                            <span class="italic">{{ `${index + 1}` }}</span><span class="italic font-bold">{{ `${question.question}` }}</span>
                        </div>
                        <Message v-if="$form[question.name]?.invalid" severity="error" icon="pi pi-times-circle" size="small" variant="outlined">{{ $form[question.name].error?.message }}</Message>
                        <RadioButtonGroup class="justify-between w-md" :name="question.name">
                            <span>Oneens</span>
                            <div class="flex items-center gap-2">
                                <RadioButton :inputId="question.name" value="1" />
                                <label :for="question.name">1</label>
                            </div>
                            <div class="flex items-center gap-2">
                                <RadioButton :inputId="question.name" value="2" />
                                <label :for="question.name">2</label>
                            </div>
                            <div class="flex items-center gap-2">
                                <RadioButton :inputId="question.name" value="3" />
                                <label :for="question.name">3</label>
                            </div>
                            <div class="flex items-center gap-2">
                                <RadioButton :inputId="question.name" value="4" />
                                <label :for="question.name">4</label>
                            </div>
                            <div class="flex items-center gap-2">
                                <RadioButton :inputId="question.name" value="5" />
                                <label :for="question.name">5</label>
                            </div>
                            <span>Eens</span>
                        </RadioButtonGroup>
                        <Divider />
                    </template> 
            <Button :disabled="loading" type="submit" severity="secondary" label="Submit" />
        </Form>
    </div>
</template>