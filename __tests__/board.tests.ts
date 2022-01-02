import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import TheBoard from '@/components/TheBoard.vue';
import { Orientation } from '@/helpers/types';
import BoardObstacle from '@/components/BoardObstacle.vue';
import TheMarsRover from '@/components/TheMarsRover.vue';
import Vue from 'vue';

const theBoardProps = {
  size: 40,
  roverPosition: { x: 10, y: 20 },
  roverOrientation: Orientation.Up,
  obstaclePositions: [
    { x: 11, y: 21 },
    { x: 12, y: 22 },
    { x: 13, y: 23 },
  ],
};

describe('Unit tests for TheBoard component', () => {
  it('check number of obstacles displayed', () => {
    const wrapper = mount(TheBoard);
    wrapper.setProps(theBoardProps);
    Vue.nextTick(() => {
      const count = wrapper.findAllComponents(BoardObstacle).length;
      expect(count).toBe(3);
    });
  });

  it('check Rover is displayed', () => {
    const wrapper = mount(TheBoard);
    wrapper.setProps(theBoardProps);
    Vue.nextTick(() => {
      const count = wrapper.findAllComponents(TheMarsRover).length;
      expect(count).toBe(1);
    });
  });

  it('check number of tiles', () => {
    const wrapper = mount(TheBoard);
    wrapper.setProps(theBoardProps);
    Vue.nextTick(() => {
      const count = wrapper.findAll('td div').length;
      expect(count).toBe(theBoardProps.size ** 2);
    });
  });

  it('test move forward', async () => {
    let mockData = theBoardProps;
    mockData.obstaclePositions = [];
    const wrapper = mount(App);
    wrapper.setData({
      board: mockData,
      commands: 'ff',
      isMoving: false,
      startPoint: { x: 0, y: 0 },
      startOrientation: '',
    });
    await (wrapper.vm as any).move();
    Vue.nextTick(() => {
      console.log(wrapper.vm.$data.board.roverPosition.x);
      console.log(wrapper.vm.$data.board.roverPosition.y);
    });
  });
});
