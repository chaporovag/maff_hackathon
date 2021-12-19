import global from "../../core/global";

export const config = {
    hovertext: 'Start talk',
    reactDistance: 3,
    portraits: './images/monk.png',
    position: new Vector3(global.POSITION.x + 31, 1.5, global.POSITION.z + 6),
    rotation: Quaternion.Euler(0, 70, 0)
}