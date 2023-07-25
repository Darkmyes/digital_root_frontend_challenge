<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const cities = ["California", "Colorado", "Florida", "Georgia", "Texas", "Wyoming"];

const searchForm = ref({
  origin: "",
  destiny: "",
  departure: "",
  return: "",
});

const errorSnackbarVisibility = ref<boolean>(false)
const errorSnackbarText = ref<string>('')

const validateSearchForm = () => {
  let isValid = true
  let validationMessage = ''

  errorSnackbarText.value = ''

  if (searchForm.value.origin == '') {
    isValid = false
    validationMessage += '<p>The Origin City is needed</p>'
  }

  if (searchForm.value.destiny == '') {
    isValid = false
    validationMessage += '<p>The Destiny City is needed</p>'
  }

  if (searchForm.value.departure == '') {
    isValid = false
    validationMessage += '<p>The Departure Date is needed</p>'
  }

  if (searchForm.value.return == '') {
    isValid = false
    validationMessage += '<p>The Return Date is needed</p>'
  }

  errorSnackbarText.value = validationMessage
  errorSnackbarVisibility.value = validationMessage !== ''

  return isValid
}

const router = useRouter();
const searchResults = () => {
  if (!validateSearchForm()) {
    return
  }

  const searchRoute = `origin=${searchForm.value.origin}&destiny=${searchForm.value.destiny}&departure=${searchForm.value.departure}&return=${searchForm.value.return}`;
  router.push("/search_results?" + searchRoute);
};

const props = defineProps<{
  origin?: string
  destiny?: string
  departure?: string
  returnDate?: string
}>()

onMounted(() => {
  searchForm.value.origin = props.origin ? props.origin.toString() : '';
  searchForm.value.destiny = props.destiny ? props.destiny.toString() : '';
  searchForm.value.departure = props.departure ? props.departure.toString() : '';
  searchForm.value.return = props.returnDate ? props.returnDate.toString() : '';
})

</script>

<template>
  <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="6" class="pa-2">
          <v-autocomplete
            v-model="searchForm.origin"
            label="Origin"
            id="origin-city"
            name="origin-city"
            density="compact"
            :items="cities"
            hide-no-data
            hide-details
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="6" md="6" class="pa-2">
          <v-autocomplete
            v-model="searchForm.destiny"
            label="Destiny"
            id="destiny-city"
            name="destiny-city"
            density="compact"
            :items="cities"
            hide-no-data
            hide-details
          ></v-autocomplete>
        </v-col>

        <v-col cols="12" sm="6" md="6" class="pa-2">
          <v-text-field
            v-model="searchForm.departure"
            label="Departure Date"
            id="departure-date"
            name="departure-date"
            hide-details="auto"
            density="compact"
            type="date"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6" class="pa-2">
          <v-text-field
            v-model="searchForm.return"
            label="Return Date"
            id="return-date"
            name="return-date"
            hide-details="auto"
            density="compact"
            type="date"
          ></v-text-field>
        </v-col>

        <v-col class="pa-2 d-flex justify-center">
            <v-btn @click="searchResults" class="text-none bg-primary text-white" size="large">
                <b>Search</b>
                <template v-slot:append>
                    <v-icon size="large" icon="mdi-magnify"></v-icon>
                </template>
            </v-btn>
        </v-col>

      </v-row>

      <v-snackbar
        v-model="errorSnackbarVisibility"
        color="red-lighten-2"
      >
        <div class="text-subtitle-1 pb-2">Try givin more details to the Search</div>

        <div v-html="errorSnackbarText"></div>

        <template v-slot:actions>
          <v-btn
            variant="text"
            @click="errorSnackbarVisibility = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
</template>
