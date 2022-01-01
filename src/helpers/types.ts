export interface Coordinate {
  x: number;
  y: number;
}

export interface Board {
  size: Number;
  roverPosition: Coordinate;
  roverOrientation: Orientation;
  obstaclePositions: Coordinate[];
}

export enum Orientation {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

export enum Level {
  Easy = 10,
  Medium = 20,
  Hard = 30,
}
