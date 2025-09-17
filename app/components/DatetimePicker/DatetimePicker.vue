<template>
    <UPopover
      :content="{
        side: 'right'
      }"
    >
        <UButton
          :label="formattedDate"
          variant="subtle"
          icon="i-heroicons-calendar-days-20-solid"
          :ui="{ base: 'justify-center' }"
        />
        <template #content>
            <div class="p-4">
                <div class="flex items-center space-x-2 mb-2">
                    <USelect
                      v-model="hour"
                      :items="hours"
                      class="grow"
                    />
                    <span>:</span>
                    <USelect
                      v-model="minute"
                      :items="minutes"
                      class="grow"
                    />
                    <USelect
                      v-model="ampm"
                      :items="['AM', 'PM']"
                      class="grow"
                    />
                </div>
                <UCalendar
                  v-model="selectedDate"
                  :is-date-unavailable="isDateUnavailable"
                />
            </div>
        </template>
    </UPopover>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import { CalendarDate, type DateValue } from '@internationalized/date';
import _ from 'lodash';

const model = defineModel<string | null>()

const internalDateTime = computed({
    get: () => model.value ? DateTime.fromISO(model.value) : DateTime.now(),
    set: (newVal: DateTime) => {
        const newIso = newVal.toISO();
        if (newIso !== model.value) {
            model.value = newIso
        }
    }
})

const selectedDate = computed({
    get: () => new CalendarDate(
      internalDateTime.value.year,
      internalDateTime.value.month,
      internalDateTime.value.day
    ),
    set: (newVal?: CalendarDate) => {
      if (!newVal) return;
      internalDateTime.value = internalDateTime.value.set({
        year: newVal.year,
        month: newVal.month,
        day: newVal.day
      })
    }
})

const hour = computed({
    get: () => String(internalDateTime.value.hour % 12 || 12),
    set: (newVal: string) => {
        const currentAmpm = internalDateTime.value.hour >= 12 ? 'PM' : 'AM';
        let newHour24 = Number(newVal);
        if (currentAmpm === 'PM' && newHour24 < 12) {
            newHour24 += 12;
        }
        if (currentAmpm === 'AM' && newHour24 === 12) {
            newHour24 = 0;
        }
        internalDateTime.value = internalDateTime.value.set({ hour: newHour24 });
    }
})

const minute = computed({
    get: () => String(internalDateTime.value.minute).padStart(2, '0'),
    set: (newVal: string) => {
        internalDateTime.value = internalDateTime.value.set({ minute: Number(newVal) })
    }
})

const ampm = computed({
    get: () => internalDateTime.value.hour >= 12 ? 'PM' : 'AM',
    set: (newVal: 'AM' | 'PM') => {
        const currentHour = internalDateTime.value.hour;
        let newHour = currentHour;
        if (newVal === 'AM' && currentHour >= 12) {
            newHour -= 12;
        }
        if (newVal === 'PM' && currentHour < 12) {
            newHour += 12;
        }
        internalDateTime.value = internalDateTime.value.set({ hour: newHour });
    }
})

const hours = computed(() => _.range(1, 13).map(String));
const minutes = computed(() => _.range(0, 60).map(
  i => String(i).padStart(2, '0')
));

const formattedDate = computed(() => {
    if (!model.value) return 'Select Date';
    return formatDateTime(model.value);
});

const isDateUnavailable = (date: DateValue) => {
  const today = DateTime.now().startOf('day');
  const selected = DateTime.fromObject({
    year: date.year,
    month: date.month,
    day: date.day
  });
  return selected < today;
};
</script>
