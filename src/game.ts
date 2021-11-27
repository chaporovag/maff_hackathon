import Squid, {Move, Rotate} from "./squid";
import Control from "./control";
import BaseEntity from "./base/baseEntity";
import {Crate} from './crate'
import {Capsule} from "./capsule";
import {Box} from "./box";
import PhysicsSystem from "./systems/physicsSystem";
import * as utils from "@dcl/ecs-scene-utils"


import Key from "./key";
import Terminal from "./terminal";
import {BoxSmall} from "./boxSmall";
import {BoxBig} from "./boxBig";
import Global from "./core/global";
import Battery from "./battery";
import Pill from "./pill";


const floor = new Entity();

// Add it to the engine for rendering
engine.addEntity(floor);

// Give it a component for the model itself
floor.addComponent(new GLTFShape("models/floor.glb"));
floor.addComponent((new Transform({ position: new Vector3(8, 0.1, 8) })));
// const floor1 = new Entity();
// engine.addEntity(floor1);

// // Give it a component for the model itself
// floor1.addComponent(new GLTFShape("models/cocon1.glb"));
// floor1.addComponent((new Transform({ position: new Vector3(2, 5, 8) })));
// const pill = new Entity();
// engine.addEntity(pill);

// // Give it a component for the model itself
// pill.addComponent(new GLTFShape("models/Pill.glb"));
// pill.addComponent((new Transform({ position: new Vector3(5, 2, 12) })));
// const battery = new Entity();
// engine.addEntity(battery);
const pill= new Pill(new Transform({ position: new Vector3(5, 2, 12) }));
// // Give it a component for the model itself
// battery.addComponent(new GLTFShape("models/BATTERY.glb"));
// battery.addComponent((new Transform({ position: new Vector3(5, 3, 12) })));
const battery= new Battery(new Transform({ position: new Vector3(5, 3, 12) }));
/*
const wall = new BaseEntity(new GLTFShape('models/wall11.glb'),{ position: new Vector3(3.8, 0, 8.1) });
const capsule1 = new Capsule(new GLTFShape("models/capsule.glb"), new Transform({ position: new Vector3(17,1.5,12),rotation: Quaternion.Euler(0, 0, 90), scale: new Vector3(2, 2, 2), }))
const capsule2 = new Capsule(new GLTFShape("models/capsule.glb"), new Transform({ position: new Vector3(17,1.5,14),rotation: Quaternion.Euler(0, 0, 90), scale: new Vector3(2, 2, 2), }))
const capsule3 = new Capsule(new GLTFShape("models/capsule2.glb"), new Transform({ position: new Vector3(17,1.5,8),rotation: Quaternion.Euler(0, 0, 90), scale: new Vector3(2, 2, 2), }))
const capsule4 = new Capsule(new GLTFShape("models/capsule2.glb"), new Transform({ position: new Vector3(17,1.5,10),rotation: Quaternion.Euler(0, 0, 90), scale: new Vector3(2, 2, 2), }))
*/



const squid = new Squid(new GLTFShape('models/squid1.glb'), { position: new Vector3(6, 0.3, 8) });
// if(squid.move) {

// }



const terminal = new Terminal(new Transform({ position: new Vector3(3,0.3,3),rotation: Quaternion.Euler(0, 225, 0) }))


const capsule = new Capsule( new Transform({ position: new Vector3(15, 0.3, 14) ,rotation: Quaternion.Euler(0, 270, 0) }), -1.5);
const capsule2 = new Capsule( new Transform({ position: new Vector3(15, 0.3, 10) ,rotation: Quaternion.Euler(0, 270, 0) }), -1.5);
const capsul3 = new Capsule( new Transform({ position: new Vector3(15, 0.3, 6) ,rotation: Quaternion.Euler(0, 270, 0) }), -1.5);
const capsule4 = new Capsule( new Transform({ position: new Vector3(15, 0.3, 2) ,rotation: Quaternion.Euler(0, 270, 0) }), -1.5);

const key= new Key(new Transform({ position: new Vector3(15, 1.3, 10) }));
	terminal.init(squid, key)
	
/*
>>>>>>> 30c8b7df1e9bd320f2c70aee531d97a00e843a43
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
const boxSmall = new BoxSmall(new Transform({ position: new Vector3(4, 0.7, 15) }))
const boxBig = new BoxBig(new Transform({ position: new Vector3(7, 0.7, 15) }))

const boxes: Box[] = [boxSmall, boxBig]
const physicsSystem = new PhysicsSystem()

boxes.forEach(box => {
  physicsSystem.addEntity(box)
})


// Controls
// "E" key up
Input.instance.subscribe("BUTTON_UP", ActionButton.POINTER, false, (e) => {
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
