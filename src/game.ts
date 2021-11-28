import Squid from "./squid";
import BaseEntity from "./base/baseEntity";
import {Capsule} from "./capsule";
import {Box} from "./box";
import PhysicsSystem from "./systems/physicsSystem";
import * as utils from '@dcl/ecs-scene-utils'

import Terminal from "./terminal";
import {BoxSmall} from "./boxSmall";
import {BoxBig} from "./boxBig";
import Pill from "./pill";


const floor = new BaseEntity(new GLTFShape("models/floor.glb"), { position: new Vector3(8, 0.1, 8) });
const wall = new BaseEntity(new GLTFShape('models/wall.glb'),{ position: new Vector3(3.8, 0, 8.1) });

floor.addComponent(
  new utils.TriggerComponent(
    new utils.TriggerBoxShape(
      new Vector3(12, 12, 12),
      new Vector3(0, 0, 0)
    ),
    {
      onCameraEnter: () => {
        new BaseEntity(new GLTFShape("models/wall_collider.glb"), wall.getComponent(Transform))
      }
    }
  )
)


const pill = new Pill( new Transform({ position: new Vector3(8, 1, 12) }));
// const key = new Key( new Transform({ position: new Vector3(6, 1, 12) }));

const squid = new Squid(new Transform({ position: new Vector3(6, 0.3, 8) }));
const terminal = new Terminal(new Transform({ position: new Vector3(3,0.1,3), rotation: Quaternion.Euler(0, 180, 0) }))
terminal.init(squid)

new Capsule( new Transform({ position: new Vector3(15, 0.1, 2) ,rotation: Quaternion.Euler(0, 270, 0) }), -1.2);
new Capsule( new Transform({ position: new Vector3(15, 0.1, 5) ,rotation: Quaternion.Euler(0, 270, 0) }), -1.2);
new Capsule( new Transform({ position: new Vector3(15, 0.1, 8) ,rotation: Quaternion.Euler(0, 270, 0) }), -1.2);
new Capsule( new Transform({ position: new Vector3(15, 0.1, 11) ,rotation: Quaternion.Euler(0, 270, 0) }), -1.2).init();
new Capsule( new Transform({ position: new Vector3(15, 0.1, 14) ,rotation: Quaternion.Euler(0, 270, 0) }), -1.2);

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
