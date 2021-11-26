import Squid, {Move, Rotate} from "./squid";
import Control from "./control";
import BaseEntity from "./base/baseEntity";
import {Crate} from './crate'
import {Capsule} from "./capsule";
import {Box} from "./box";
import PhysicsSystem from "./systems/physicsSystem";
import Key from "./key";

const squid = new Squid(new GLTFShape('models/squid.glb'), { position: new Vector3(6, 0, 8) });
const wall = new BaseEntity(new GLTFShape('models/wall11.glb'),{ position: new Vector3(3.8, 0, 8.1) });

const control1 = new Control({ position: new Vector3(3.5, -5, 3.6), rotation: Quaternion.Euler(0, 90, 0) });
const control2 = new Control({ position: new Vector3(5.5, -5, 3.6), rotation: Quaternion.Euler(0, 90, 0) });

const controlRight = new Control({ position: new Vector3(8.5, -5, 3.6), rotation: Quaternion.Euler(0, 90, 0) });
const controlLeft = new Control({ position: new Vector3(10.5, -5, 3.6), rotation: Quaternion.Euler(0, 90, 0) });

const capsule1= new Capsule(new GLTFShape("models/capsule.glb"), new Transform({ position: new Vector3(17,1.5,12),rotation: Quaternion.Euler(0, 0, 90), scale: new Vector3(2, 2, 2), }))
const capsule2= new Capsule(new GLTFShape("models/capsule.glb"), new Transform({ position: new Vector3(17,1.5,14),rotation: Quaternion.Euler(0, 0, 90), scale: new Vector3(2, 2, 2), }))
const capsule3= new Capsule(new GLTFShape("models/capsule2.glb"), new Transform({ position: new Vector3(17,1.5,8),rotation: Quaternion.Euler(0, 0, 90), scale: new Vector3(2, 2, 2), }))
const capsule4= new Capsule(new GLTFShape("models/capsule2.glb"), new Transform({ position: new Vector3(17,1.5,10),rotation: Quaternion.Euler(0, 0, 90), scale: new Vector3(2, 2, 2), }))


control1.addComponent(
  new OnPointerDown((): void => {
    squid.move(Move.FORWARD)
  })
)
control1.addComponent(
  new OnPointerUp((): void => {
    squid.move()
  })
)

control2.addComponent(
  new OnPointerDown((): void => {
    squid.move(Move.BACK)
  })
)
control2.addComponent(
  new OnPointerUp((): void => {
    squid.move()
  })
)

controlRight.addComponent(
  new OnPointerDown((): void => {
    squid.rotate(Rotate.RIGHT)
  },)
)
controlRight.addComponent(
  new OnPointerUp((): void => {
    squid.rotate();
  })
)

controlLeft.addComponent(
  new OnPointerDown((): void => {
    squid.rotate(Rotate.LEFT)
  },)
)
controlLeft.addComponent(
  new OnPointerUp((): void => {
    squid.rotate();
  })
)

const crate = new Crate(
  new Transform({
    position: new Vector3(8, 0.5, 12),
  })
)
const crate1 = new Crate(
  new Transform({
    position: new Vector3(8, 2.5, 12),
  })
)
const crate2 = new Crate(
  new Transform({
    position: new Vector3(4, 0.5, 12),
  })
)


const key = new Key(new GLTFShape("models/key.glb"), new Transform({ position: new Vector3(8, 3.2, 12) }))


// Create balls
const box1 = new Box(new Transform({ position: new Vector3(12, 0.5, 6) }))
const box2 = new Box(new Transform({ position: new Vector3(12, 0.5, 7) }))
const box3 = new Box(new Transform({ position: new Vector3(12, 0.5, 8) }))
const box4 = new Box(new Transform({ position: new Vector3(12, 0.5, 9) }))
const box5 = new Box(new Transform({ position: new Vector3(12, 0.5, 10) }))

const boxes: Box[] = [box1, box2, box3, box4, box5]
const physicsSystem = new PhysicsSystem()

boxes.forEach(box => {
  physicsSystem.addEntity(box)
})


// Controls
Input.instance.subscribe("BUTTON_UP", ActionButton.POINTER, false, (e) => {
  boxes.forEach(box => {
    if (box.isActive) {
      // Camera's forward vector
      const throwDirection = Vector3.Forward().rotate(Camera.instance.rotation)
      box.playerDrop(throwDirection)
    }
  })
})
