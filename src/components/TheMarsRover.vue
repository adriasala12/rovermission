<template>
  <div
    class="w-3 h-3 rounded-sm bg-green-700 flex place-content-center text-clip"
  >
    <i
      class="justify-self-center place-self-center fa text-xs text-white"
      :class="'fa-arrow-' + orientation"
    ></i>
  </div>
</template>

<script>
export default {
  name: "TheMarsRover",
  props: {
    // values: up, down, left, right
    orientation: String,
  },
};
</script>

