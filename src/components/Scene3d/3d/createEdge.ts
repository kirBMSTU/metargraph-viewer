import {Cord} from '../../../types/3d';

export default function createEdge(cord1: Cord, cord2: Cord) {
    const { x: x1, y: y1, z: z1 } = cord1;
    const { x: x2, y: y2, z: z2 } = cord2;

    const entity = document.createElement('a-entity');
    const path = `${[x1, y1, z1].join(' ')}, ${[x2, y2, z2].join(' ')}`;
    entity.setAttribute('meshline', `lineWidth: 4; color: yellow; path: ${path};`);

    return entity;
}
