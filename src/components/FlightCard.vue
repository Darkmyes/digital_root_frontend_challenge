<script setup lang="ts">
import { type Flight } from '@/domain/flight'

defineProps<{
    flight: Flight
}>()
</script>

<template>
    <v-card class="cursor-pointer">
        <v-card-title>
            {{ flight.origin }} -
            {{ flight.destiny }}
        </v-card-title>
        <v-card-item class="pa-0"> 
            <div class="bg-primary px-4">
                <h3><b>$ {{ flight.price }}</b></h3>
            </div>
            <div class="bg-secondary px-4">
                <b> {{ flight.departure }} - {{ flight.return }}</b>
            </div>
            <div class="px-4">
                <b>{{ flight.airline }}</b>
            </div>
            <div class="px-4">
                Duration: <b>{{ flight.duration }}</b>
            </div>
            <div class="px-4 pb-2">
                Scales: <b>{{ flight.scales }}</b>
            </div>
            <div class="px-4 pb-2 d-flex justify-end">
                <v-btn href="/some_page" target="_blank" color="primary" prepend-icon="mdi-web">
                    <b>Go to Site</b>
                </v-btn>
            </div>
        </v-card-item>
    </v-card>
</template>

<style>
.cursor-pointer {
    cursor: pointer;
}
</style>