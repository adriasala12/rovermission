<template>
  <div>
    <table class="mx-auto border-2 border-yellow-600 bg-black">
      <tbody>
        <tr v-for="iy in size" :key="iy" class="w-4 h-4">
          <td v-for="ix in size" :key="ix" class="">
            <TheMarsRover
              :orientation="roverOrientation"
              v-if="roverPosition.x === ix && roverPosition.y === iy"
            />
            <BoardObstacle
              v-else-if="stringObstacles.indexOf(`${ix}-${iy}`) != -1"
            />
            <BoardTile v-else />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BoardTile from "./BoardTile.vue";
import TheMarsRover from "./TheMarsRover.vue";
import BoardObstacle from "./BoardObstacle.vue";

export default {
  name: "TheBoard",
  props: {
    size: Number,
    roverPosition: Object,
    roverOrientation: String,
    obstaclePositions: Array,
  },
  components: {
    BoardTile,
    BoardObstacle,
    TheMarsRover,
  },
  computed: {
    stringObstacles: function () {
      let result = [];
      this.obstaclePositions.forEach((obstacle) => {
        result.push(obstacle.x + "-" + obstacle.y);
      });
      return result;
    },
  },
};
</script>