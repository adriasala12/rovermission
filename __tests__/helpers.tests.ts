import Helpers from '@/helpers/helpers';
import { Level } from '@/helpers/types';

describe("Unit tests for Helpers's methods", () => {
  it('new board has all member properties set', () => {
    const board = Helpers.newBoard();
    expect(board.size).toBe(40);
    expect(board.difficulty).toBe(Level.Medium);
    expect(board.roverPosition.x).toBeGreaterThan(0);
    expect(board.roverPosition.x).toBeLessThanOrEqual(board.size);
    expect(board.roverPosition.y).toBeGreaterThan(0);
    expect(board.roverPosition.y).toBeLessThanOrEqual(board.size);
    expect(board.roverOrientation).toBeDefined();
    expect(board.obstaclePositions.length).toBeGreaterThan(0);
  });

  it('board has correct number of obstacles', () => {
    const board = Helpers.newBoard();
    expect(board.obstaclePositions.length).toBe(board.difficulty);
  });
});
