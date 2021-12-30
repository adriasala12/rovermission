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
  data() {
    return {
      obstacles: [
        { x: 23, y: 18 },
        { x: 35, y: 3 },
      ],
      roverPosition: { x: 1, y: 10 },
      roverOrientation: "down",
    };
  },
  props: {
    size: {
      type: Number,
      default: 40,
    },
  },
  components: {
    BoardTile,
    BoardObstacle,
    TheMarsRover,
  },
  computed: {
    stringObstacles: function () {
      let result = [];
      this.obstacles.forEach((obstacle) => {
        result.push(obstacle.x + "-" + obstacle.y);
      });
      return result;
    },
  },
};
</script>