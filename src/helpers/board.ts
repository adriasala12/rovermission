import { Helpers } from './helpers';

export default class Board {
  size: number = 40;
  roverPosition: Coordinate;
  roverOrientation: Orientation;
  obstaclePositions: Coordinate[];

  constructor() {
    this.roverPosition = this.placeRover(this.size);
    this.roverOrientation = this.pointRover(this.size, this.roverPosition);
    this.obstaclePositions = this.placeObstacles(
      this.size,
      Level.medium,
      this.roverPosition
    );
  }

  private placeRover(boardSize: number): Coordinate {
    return Helpers.getRandomCoordinate(boardSize);
  }

  private pointRover(
    boardSize: number,
    roverPosition: Coordinate
  ): Orientation {
    let orientations = [
      Orientation.up,
      Orientation.down,
      Orientation.left,
      Orientation.right,
    ];

    if (roverPosition.y === 1) {
      let index = orientations.indexOf(Orientation.up);
      orientations.splice(index, 0);
    }

    if (roverPosition.y === boardSize) {
      let index = orientations.indexOf(Orientation.down);
      orientations.splice(index, 0);
    }

    if (roverPosition.x === 1) {
      let index = orientations.indexOf(Orientation.left);
      orientations.splice(index, 0);
    }

    if (roverPosition.x === boardSize) {
      let index = orientations.indexOf(Orientation.right);
      orientations.splice(index, 0);
    }

    return orientations[Math.floor(Math.random() * orientations.length)];
  }

  private placeObstacles(
    boardSize: number,
    difficulty: Level,
    roverPosition: Coordinate
  ): Coordinate[] {
    let count = 0;
    switch (difficulty) {
      case Level.easy:
        count = 10;
        break;
      case Level.medium:
        count = 20;
        break;
      case Level.hard:
        count = 30;
        break;
    }

    let obstacles: Coordinate[] = [];
    while (count > 0) {
      let coordinate = Helpers.getRandomCoordinate(boardSize);

      // Do not place obstacle over rover or in 1 radius
      let roverXRange = [
        roverPosition.x - 1,
        roverPosition.x,
        roverPosition.x + 1,
      ];
      let roverYRange = [
        roverPosition.y - 1,
        roverPosition.y,
        roverPosition.y + 1,
      ];
      while (
        roverXRange.indexOf(coordinate.x) > -1 &&
        roverYRange.indexOf(coordinate.y) > -1
      ) {
        coordinate = Helpers.getRandomCoordinate(boardSize);
      }

      obstacles.push(coordinate);
      count--;
    }

    return obstacles;
  }
}
