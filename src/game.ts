import Squid from "./squid";
import BaseEntity from "./base/baseEntity";
import {Capsule} from "./capsule";
import {Box} from "./box";
import PhysicsSystem from "./systems/physicsSystem";

import Terminal from "./terminal";
import {BoxSmall} from "./boxSmall";
import {BoxBig} from "./boxBig";
import {Crate} from "./crate";

const floor = new Entity();
// Add it to the engine for rendering
engine.addEntity(floor);
// Give it a component for the model itself
floor.addComponent(new GLTFShape("models/floor.glb"));
floor.addComponent((new Transform({ position: new Vector3(8, 0.1, 8) })));

const wall = new BaseEntity(new GLTFShape('models/wall11.glb'),{ position: new Vector3(3.8, 0, 8.1) });


// const battery = new Crate(new GLTFShape('models/battery.glb'), new Transform({ position: new Vector3(15, 0, 10.5)}))
/*
const crate = new Crate(
  new Transform({
    position: new Vector3(8, 0.5, 12),
  })
)
*/
const squid = new Squid(new GLTFShape('models/squid.glb'), { position: new Vector3(6, 0.3, 8) });


const terminal = new Terminal(new Transform({ position: new Vector3(3,0.1,3),rotation: Quaternion.Euler(0, 180, 0) }))

new Capsule( new Transform({ position: new Vector3(15.8, 0.1, 2) ,rotation: Quaternion.Euler(0, 270, 0) }), -1.2);
new Capsule( new Transform({ position: new Vector3(15.8, 0.1, 5) ,rotation: Quaternion.Euler(0, 270, 0) }), -1.2);
new Capsule( new Transform({ position: new Vector3(15.8, 0.1, 8) ,rotation: Quaternion.Euler(0, 270, 0) }), -1.2);
const batteryCapsule = new Capsule( new Transform({ position: new Vector3(15.8, 0.1, 11) ,rotation: Quaternion.Euler(0, 270, 0) }), -1.2);
batteryCapsule.init()
new Capsule( new Transform({ position: new Vector3(15.8, 0.1, 14) ,rotation: Quaternion.Euler(0, 270, 0) }), -1.2);

terminal.init(squid)





// Create balls
const boxSmall = new BoxSmall(new Transform({ position: new Vector3(12, 0.5, 6) }))
const boxBig = new BoxBig(new Transform({ position: new Vector3(12, 0.5, 10) }))

const boxes: Box[] = [boxSmall, boxBig]
const physicsSystem = new PhysicsSystem()

boxes.forEach(box => {
  physicsSystem.addEntity(box)
})


// Controls
// "E" key up
Input.instance.subscribe("BUTTON_UP", ActionButton.PRIMARY, false, (e) => {
  squid.rotate();
  squid.move();
})

// "MOUSE LEFT" is up
Input.instance.subscribe("BUTTON_UP", ActionButton.POINTER, false, (e) => {
  squid.rotate();
  squid.move();
  boxes.forEach(box => {
    if (box.isActive) {
      const throwDirection = Vector3.Forward().rotate(Camera.instance.rotation)
      box.playerDrop(throwDirection)
    }
  })
})
