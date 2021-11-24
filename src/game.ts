import Squad from "./squad";
import Control from "./control";
import BaseEntity from "./baseEntity";

const squid = new Squad(new GLTFShape('models/squid.glb'), { position: new Vector3(6, 0, 8) });
const wall = new BaseEntity(new GLTFShape('models/wall10.glb'),{ position: new Vector3(3.8, 0, 8.1) });

const control1 = new Control({ position: new Vector3(5.5, -5, 3.6), rotation: Quaternion.Euler(0, 90, 0) });
const control2 = new Control({ position: new Vector3(7.5, -5, 3.6), rotation: Quaternion.Euler(0, 90, 0) });

Input.instance.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, false, (e) => log('key down', e))

control1.addComponent(
  new OnPointerDown((): void => {
    squid.startMove(1)
  })
)

control1.addComponent(
  new OnPointerUp((): void => {
    squid.stopMove()
  })
)

control2.addComponent(
  new OnPointerDown((): void => {
    squid.startMove(-1)
  })
)

control2.addComponent(
  new OnPointerUp((): void => {
    squid.stopMove()
  })
)