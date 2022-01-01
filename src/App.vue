<template>
  <div>
    <TheBoard
      class="mt-2"
      :size="board.size"
      :roverPosition="board.roverPosition"
      :roverOrientation="board.roverOrientation"
      :obstaclePositions="board.obstaclePositions"
    />
    <div class="my-5 flex flex-col gap-6">
      <span class="bg-yellow-500 font-bold mx-auto p-4 text-yellow-800"
        >Use your keyboard to control the Rover:<br />
        - F: Move Forward<br />
        - R: Move Right<br />
        - L: Move Left
      </span>
      <input
        type="text"
        placeholder="ENTER COMMANDS"
        class="
          py-2
          px-2
          w-2/6
          mx-auto
          rounded-lg
          uppercase
          text-center
          border-yellow-800 border-2
          font-bold
          tracking-widest
        "
        maxlength="10"
        v-model="commands"
        @keypress="inputValidator($event)"
        @keyup.enter="move"
        :disabled="isMoving"
      />
      <button
        class="
          bg-white
          py-2
          rounded-lg
          w-1/4
          mx-auto
          font-bold
          disabled:cursor-not-allowed disabled:bg-gray-500
        "
        @click="move"
        :disabled="isMoving"
      >
        Send Commands
      </button>
      <button
        class="bg-white py-2 rounded-lg w-1/4 mx-auto font-bold"
        @click="newGame"
      >
        New Game
      </button>
    </div>
  </div>
</template>

<script>
import TheBoard from "./components/TheBoard.vue";
import Helpers from "./helpers/helpers.ts";

export default {
  name: "App",
  components: {
    TheBoard,
  },
  data() {
    return {
      board: Object,
      commands: "",
      isMoving: false,
      startPoint: Object,
      startOrientation: String,
    };
  },
  mounted: function () {
    this.newGame();
  },
  methods: {
    newGame: function () {
      this.board = Helpers.newBoard();
    },
    inputValidator: function (e) {
      let char = String.fromCharCode(e.keyCode);
      let regexp = new RegExp("[FfLlRr]");
      if (regexp.test(char)) {
        return true;
      } else {
        e.preventDefault();
      }
    },
    move: async function () {
      this.startPoint.x = this.board.roverPosition.x;
      this.startPoint.y = this.board.roverPosition.y;
      this.startOrientation = this.board.roverOrientation;
      this.isMoving = true;

      let instructions = this.commands.split("");
      for (let i in instructions) {
        if (instructions[i] !== "f" || instructions[i] !== "F") {
          this.changeOrientation(instructions[i]);
          await this.timeout(500);
        }
        if (this.isObstacle()) {
          this.board.roverPosition.x = this.startPoint.x;
          this.board.roverPosition.y = this.startPoint.y;
          this.board.roverOrientation = this.startOrientation;
          alert(
            "Caution! There's an obstacle in this path. Please, try some other way."
          );
          break;
        } else {
          this.moveForward();
          await this.timeout(500);
        }
      }

      this.commands = "";
      this.isMoving = false;
    },
    isObstacle: function () {
      let forward = new Object();
      switch (this.board.roverOrientation) {
        case "up":
          forward.x = this.board.roverPosition.x;
          forward.y = this.board.roverPosition.y - 1;
          break;
        case "right":
          forward.x = this.board.roverPosition.x + 1;
          forward.y = this.board.roverPosition.y;
          break;
        case "down":
          forward.x = this.board.roverPosition.x;
          forward.y = this.board.roverPosition.y + 1;
          break;
        case "left":
          forward.x = this.board.roverPosition.x - 1;
          forward.y = this.board.roverPosition.y;
          break;
      }
      const obstacle = this.board.obstaclePositions.some((obs) => {
        return obs.x === forward.x && obs.y === forward.y;
      });
      const out =
        forward.x === 0 ||
        forward.x > this.board.size ||
        forward.y === 0 ||
        forward.y > this.board.size;
      return obstacle || out;
    },
    timeout: function (time) {
      return new Promise((res) => setTimeout(res, time));
    },
    moveForward: function () {
      switch (this.board.roverOrientation) {
        case "up":
          this.board.roverPosition.y = this.board.roverPosition.y - 1;
          break;
        case "right":
          this.board.roverPosition.x = this.board.roverPosition.x + 1;
          break;
        case "down":
          this.board.roverPosition.y = this.board.roverPosition.y + 1;
          break;
        case "left":
          this.board.roverPosition.x = this.board.roverPosition.x - 1;
          break;
      }
    },
    changeOrientation: function (instruction) {
      switch (instruction.toLowerCase()) {
        case "r":
          switch (this.board.roverOrientation) {
            case "up":
              this.board.roverOrientation = "right";
              break;
            case "right":
              this.board.roverOrientation = "down";
              break;
            case "down":
              this.board.roverOrientation = "left";
              break;
            case "left":
              this.board.roverOrientation = "up";
              break;
          }
          break;
        case "l":
          switch (this.board.roverOrientation) {
            case "up":
              this.board.roverOrientation = "left";
              break;
            case "right":
              this.board.roverOrientation = "up";
              break;
            case "down":
              this.board.roverOrientation = "right";
              break;
            case "left":
              this.board.roverOrientation = "down";
              break;
          }
          break;
      }
    },
  },
};
</script>
