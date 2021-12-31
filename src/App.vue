<template>
  <div>
    <TheBoard
      :size="board.size"
      :roverPosition="board.roverPosition"
      :roverOrientation="board.roverOrientation"
      :obstaclePositions="board.obstaclePositions"
    />
  </div>
</template>

<script>
import TheBoard from "./components/TheBoard.vue";
import Board from "./helpers/board.ts";
import Helpers from "./helpers/helpers.ts";

export default {
  name: "App",
  components: {
    TheBoard,
  },
  data() {
    return {
      board: Board,
    };
  },
  mounted: function () {
    this.newGame();
  },
  methods: {
    newGame: function () {
      this.board = new Board();
    },
  },
};
</script>
