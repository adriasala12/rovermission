import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import { Orientation } from '@/helpers/types';
import Vue from 'vue';

const mockData = {
  board: {
    size: 40,
    roverPosition: { x: 10, y: 20 },
    roverOrientation: Orientation.Up,
    obstaclePositions: [
      { x: 11, y: 21 },
      { x: 12, y: 22 },
      { x: 13, y: 23 },
    ],
  },
  commands: 'ff',
  isMoving: false,
  startPoint: { x: 0, y: 0 },
  startOrientation: '',
};

describe('Unit tests for App component', () => {
  it('test move forward', async () => {
    let changeMockData = mockData;
    changeMockData.board.obstaclePositions = [];
    const wrapper = mount(App);
    wrapper.setData(changeMockData);
    await (wrapper.vm as any).move();
    Vue.nextTick(() => {
      expect(
        Math.abs(
          wrapper.vm.$data.board.roverPosition.y - changeMockData.startPoint.y
        )
      ).toBe(2);
    });
  });

  it('test move right and left + changeOrientation', async () => {
    let changeMockData = mockData;
    changeMockData.board.obstaclePositions = [];
    changeMockData.commands = 'rl';
    const wrapper = mount(App);
    wrapper.setData(changeMockData);
    await (wrapper.vm as any).move();
    Vue.nextTick(() => {
      expect(wrapper.vm.$data.board.roverPosition.y).toBe(
        changeMockData.startPoint.y - 1
      );
      expect(wrapper.vm.$data.board.roverPosition.x).toBe(
        changeMockData.startPoint.x + 1
      );
    });
  });

  it('test obstacle detection', async () => {
    let changeMockData = mockData;
    changeMockData.board.obstaclePositions = [{ x: 10, y: 19 }];
    const wrapper = mount(App);
    wrapper.setData(changeMockData);

    expect((wrapper.vm as any).isObstacle()).toBeTruthy();
  });

  it('test out of board detection', async () => {
    let changeMockData = mockData;
    changeMockData.board.roverPosition = { x: 1, y: 1 };
    const wrapper = mount(App);
    wrapper.setData(changeMockData);

    expect((wrapper.vm as any).isObstacle()).toBeTruthy();
  });
});
