import { Board, Coordinate, Level as Difficulty, Orientation } from './types';
export default class Helpers {
  /**
   * Summary. Returns a new board, placing the Rover and the obstacles
   * @param size The size of the board (a square of size*size)
   * @param difficulty The difficulty level will determine the number of obstacles
   * @returns
   */
  public static newBoard(
    size: number = 40,
    difficulty: Difficulty = Difficulty.Medium
  ): Board {
    let roverPosition = this.getRandomCoordinate(size);
    return {
      size: size,
      roverPosition: roverPosition,
      roverOrientation: this.getRandomOrientation(),
      obstaclePositions: this.placeObstacles(size, difficulty, roverPosition),
    };
  }

  /**
   * Summary. Returns a coordinate within the board
   * @param boardSize The size of the board (a square of size*size)
   * @returns
   */
  private static getRandomCoordinate(boardSize: number): Coordinate {
    let x = Math.floor(Math.random() * (boardSize - 1)) + 1;
    let y = Math.floor(Math.random() * (boardSize - 1)) + 1;
    return { x: x, y: y };
  }

  /**
   * Summary. Gets a random Orientation
   * @returns
   */
  private static getRandomOrientation(): Orientation {
    const orientations = [
      Orientation.Up,
      Orientation.Down,
      Orientation.Left,
      Orientation.Right,
    ];
    return orientations[Math.floor(Math.random() * orientations.length)];
  }

  /**
   * Summary. Returns an array with the coordinates of the obstacles
   * @param boardSize The size of the board (a square of size*size)
   * @param difficulty The difficulty level will determine the number of obstacles
   * @param roverPosition The position of the Rover
   * @returns
   */
  private static placeObstacles(
    boardSize: number,
    difficulty: Difficulty,
    roverPosition: Coordinate
  ): Coordinate[] {
    let count = difficulty;
    let obstacles: Coordinate[] = [];
    while (count > 0) {
      let coordinate = this.getRandomCoordinate(boardSize);

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
        coordinate = this.getRandomCoordinate(boardSize);
      }

      obstacles.push(coordinate);
      count--;
    }

    return obstacles;
  }
}
