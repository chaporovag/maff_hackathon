import global from "../../core/global";

export const config = {
    hovertext: 'Talk with Monk',
    reactDistance: 3,
    portraits: './images/monk.png',
    position: new Vector3(global.POSITION.x + 31, 1.5, global.POSITION.z + 4),
    rotation: Quaternion.Euler(0, 90, 0)
}