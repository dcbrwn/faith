import Radar from './Radar';

interface Renderable {
  getImage(radar: Radar, state: string);
};

export default Renderable;
