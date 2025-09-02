<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
import { useAPI } from './composables/useAPI';

// const { data } = useAPI('/courses');
// console.log(data.value);
</script>
