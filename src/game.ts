import Squid from "./squid";
import BaseEntity from "./base/baseEntity";
import {Capsule} from "./capsule";
import {Box} from "./box";
import PhysicsSystem from "./systems/physicsSystem";

import Key from "./key";
import Terminal from "./terminal";
import {BoxSmall} from "./boxSmall";
import {BoxBig} from "./boxBig";


const floor = new Entity();
// Add it to the engine for rendering
engine.addEntity(floor);
// Give it a component for the model itself
floor.addComponent(new GLTFShape("models/floor.glb"));
floor.addComponent((new Transform({ position: new Vector3(8, 0.1, 8) })));

const wall = new BaseEntity(new GLTFShape('models/wall11.glb'),{ position: new Vector3(3.8, 0, 8.1) });

/*
const capsule1 = new Capsule(new GLTFShape("models/capsule.glb"), new Transform({ position: new Vector3(17,1.5,12),rotation: Quaternion.Euler(0, 0, 90), scale: new Vector3(2, 2, 2), }))
const capsule2 = new Capsule(new GLTFShape("models/capsule.glb"), new Transform({ position: new Vector3(17,1.5,14),rotation: Quaternion.Euler(0, 0, 90), scale: new Vector3(2, 2, 2), }))
const capsule3 = new Capsule(new GLTFShape("models/capsule2.glb"), new Transform({ position: new Vector3(17,1.5,8),rotation: Quaternion.Euler(0, 0, 90), scale: new Vector3(2, 2, 2), }))
const capsule4 = new Capsule(new GLTFShape("models/capsule2.glb"), new Transform({ position: new Vector3(17,1.5,10),rotation: Quaternion.Euler(0, 0, 90), scale: new Vector3(2, 2, 2), }))
*/



// const squid = new Squid(new GLTFShape('models/squid.glb'), { position: new Vector3(6, 0, 8) });
const squid = new Squid(new GLTFShape('models/squid_v1.1.glb'), { position: new Vector3(6, 0.3, 8) });



const terminal = new Terminal(new Transform({ position: new Vector3(3,0,3),rotation: Quaternion.Euler(0, 180, 0) }))

new Capsule( new Transform({ position: new Vector3(15.8, 0.3, 5) ,rotation: Quaternion.Euler(0, 270, 0) }), -1.2);
new Capsule( new Transform({ position: new Vector3(15.8, 0.3, 8) ,rotation: Quaternion.Euler(0, 270, 0) }), -1.2);
new Capsule( new Transform({ position: new Vector3(15.8, 0.3, 11) ,rotation: Quaternion.Euler(0, 270, 0) }), -1.2);
new Capsule( new Transform({ position: new Vector3(15.8, 0.3, 14) ,rotation: Quaternion.Euler(0, 270, 0) }), -1.2);

const key= new Key(new Transform({ position: new Vector3(14, 1.3, 12) }));
	terminal.init(squid, key)
	
/*
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
*/



// Create balls
const boxSmall = new BoxSmall(new Transform({ position: new Vector3(12, 0.7, 6) }))
const boxBig = new BoxBig(new Transform({ position: new Vector3(12, 0.7, 10) }))

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
