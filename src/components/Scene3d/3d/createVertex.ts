import {Cord} from '../../../types/3d';

export default function createVertex({x, y, z}: Cord): HTMLElement {
    const entity = document.createElement('a-entity');

    entity.setAttribute('material', 'color: #444');
    entity.setAttribute('shadow', String(true));
    entity.setAttribute('geometry', 'primitive: sphere; radius: 0.05');
    entity.setAttribute('position', [x, y, z].join(' '));

    return entity;
}
