<script setup lang="ts">
import { Card, Button } from 'primevue'
import router from '@/router';

const cardData = [
    {
        icon: '',
        title: 'Bewustwording',
        content: 'Start de dialoog en prikkel het bewustzijn over samenwerking. Open vragen nodigen uit tot het delen van ervaringen en perspectieven.'
    },
    {
        icon: '',
        title: 'Inzicht',
        content: 'Verdiep het begrip van groepsdynamiek en individuele rollen. Thematische kaarten verkennen mechanismen zoals systeemdenken en communicatie.'
    },
    {
        icon: '',
        title: 'Actie',
        content: 'Formuleer concrete stappen om de samenwerking te verbeteren. Begeleidt teams bij het opstellen van haalbare actiepunten.'
    },
    {
        title: 'Reflectie',
        content: 'Evalueer de voortgang en de besproken thema’s. Nodigt uit tot individuele en gezamenlijke reflectie op het proces.'
    },
    {
        title: 'Navigator',
        content: 'Spelregels en tips voor facilitering. Biedt structuur en begeleiding voor een constructieve dialoog.'
    },
    {
        title: 'Profiel & groepsvorming',
        content: 'Individuele reflectie leidt tot teaminzichten. Genereer persoonlijke profielen en vorm diverse groepen voor rijkere dialogen.'
    }
]
</script>

<template>
    <Card class="my-4 flex flex-wrap">
        <template #title>Ontdek en verbeter jullie teamsamenwerking</template>
        <template #content>De Teamontwikkelingsnavigator is een interactieve tool ontworpen om teams, met name in het onderwijs, te helpen hun samenwerking te analyseren, begrijpen en verbeteren via een gestructureerde dialoog met behulp van digitale en fysieke kaarten.</template>
        <template #footer><div class="flex gap-4 mt-1"><Button label="Start de navigator" @click="() => router.push('/takesurvey')"/></div></template>
    </Card>

    <div class="grid grid-cols-3 gap-4">
        <Card v-for="item in cardData">
            <template #title>{{ item.title }}</template>
            <template #content>{{ item.content }}</template>
        </Card>
    </div>

    <Card class="my-4">
        <template #title>Hoe het werkt: een cyclisch proces</template>
        <template #content>
            <div class="grid grid-cols-4 gap-2">
                <Card>
                    <template #title>Voorbereiding & profiel</template>
                    <template #content>Individuele vragenlijst (online) vormt een persoonlijk samenwerkprofiel.</template>
                </Card>
                <Card>
                    <template #title>Collectieve dialoog</template>
                    <template #content>In groepen bespreken teams thema’s met fysieke kaarten en scoren het belang.</template>
                </Card>
                <Card>
                    <template #title>Beslisboom & actie</template>
                    <template #content>Scores leiden via een online beslisboom naar focusgebieden en concrete actieplanning</template>
                </Card>
                <Card>
                    <template #title>Uitvoering & reflectie</template>
                    <template #content>Teams voeren de acties uit en reflecteren op het proces en de resultaten</template>
                </Card>
            </div>
        </template>
    </Card>
</template>