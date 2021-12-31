export default class Helpers {
  public static getRandomCoordinate(boardSize: number): Coordinate {
    let x = Math.floor(Math.random() * (boardSize - 1)) + 1;
    let y = Math.floor(Math.random() * (boardSize - 1)) + 1;
    return { x: x, y: y };
  }
}
