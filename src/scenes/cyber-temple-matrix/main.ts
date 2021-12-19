import * as ui from "@dcl/ui-scene-utils";
import * as utils from '@dcl/ecs-scene-utils'
import { DialogWindow } from '@dcl/npc-scene-utils'
import BaseEntity from "./base/baseEntity";
import Pill from "./entities/pill";
import Robot from "./entities/robot";
import Terminal from "./entities/terminal";
import {addWall} from "./entities/wall";
import global from "./core/global";
import {Talk} from "./entities/talk";
import {Capsule} from "./entities/capsule";
import {Box} from "./entities/box";
import {BoxSmall} from "./entities/boxSmall";
import PhysicsSystem from "./systems/physicsSystem";
import {BoxBig} from "./entities/boxBig";
import {Like} from "./services/Like/Like";
import resources from "./resources";

export let dialogWindow = new DialogWindow()



export function createCyberTempleMatrix(): void {
  const like = new Like(
    {
      position: new Vector3(31, 0.75, 58),
      rotation: Quaternion.Euler(0, 90, 0),
    },
    '61b905d2dd08def8380abab9'
  )

  const Start = new Entity()
  engine.addEntity(Start)
  const Ambient = Start.addComponent(new AudioSource(new AudioClip(resources.SOUND_AMBIENT)))

  Start.addComponent(new Transform({position: new Vector3(8,11,8)}))



  const squid = new Robot(new Transform({ position: new Vector3(6,0.1,56), rotation: Quaternion.Euler(0, 60, 0)}));
  const terminal = new Terminal(new Transform({ position: new Vector3(4,0.08,61), rotation: Quaternion.Euler(0, 315, 0) }))

  const pill = new Pill(new Transform({ position: new Vector3(18, 7.5, 56) }));
  terminal.init(squid)

  const floor = new BaseEntity(new GLTFShape(resources.MODEL_FLOOR), { position: new Vector3(8, 0.1, 56),rotation: Quaternion.Euler(0, 90, 0) });
  const roof = new BaseEntity(new GLTFShape(resources.MODEL_FLOOR), { position: new Vector3(8, 9.9, 56) ,rotation: Quaternion.Euler(180, 90, 0)});
  const floor1 = new BaseEntity(new GLTFShape(resources.MODEL_FLOOR), { position: new Vector3(22.88, 0.1, 56),rotation: Quaternion.Euler(0, 90, 0),scale: new Vector3(1, 1, .885), });
  const roof1 = new BaseEntity(new GLTFShape(resources.MODEL_FLOOR), { position: new Vector3(22.88, 9.9, 56) ,rotation: Quaternion.Euler(180, 90, 0),scale: new Vector3(1, 1, .885)});

  addWall(
    resources.VIDEO_WALL,
    new Transform({
      position: new Vector3(29.9, 5, 56),
      scale: new Vector3(15.8, 10, 1),
      rotation: Quaternion.Euler(0, 270, 0)
    })
  )
  addWall(
    resources.VIDEO_WALL,
    new Transform({
      position: new Vector3(0.1, 5, 56),
      scale: new Vector3(15.8, 10, 1),
      rotation: Quaternion.Euler(0, 90, 0)
    })
  )
  addWall(
    resources.VIDEO_WALL,
    new Transform({
      position: new Vector3(8, 5, 63.9),
      scale: new Vector3(15.8, 10, 1),
      rotation: Quaternion.Euler(0, 0, 0)
    })
  )
  addWall(
    resources.VIDEO_WALL,
    new Transform({
      position: new Vector3(8, 5, 48.1),
      scale: new Vector3(15.8, 10, 1),
      rotation: Quaternion.Euler(0, 180, 0)
    })
  )
  addWall(
    resources.VIDEO_WALL,
    new Transform({
      position: new Vector3(22, 5, 63.9),
      scale: new Vector3(15.8, 10, 1),
      rotation: Quaternion.Euler(0, 0, 0)
    })
  )
  addWall(
    resources.VIDEO_WALL,
    new Transform({
      position: new Vector3(22, 5, 48.1),
      scale: new Vector3(15.8, 10, 1),
      rotation: Quaternion.Euler(0, 180, 0)
    })
  )


  let wallCollider: BaseEntity
  let oneSound = 1
  floor1.addComponent(
    new utils.TriggerComponent(
      new utils.TriggerBoxShape(
        new Vector3(12, 12, 60),
        new Vector3(0, 0, 0)
      ),
      {
        onCameraEnter: () => {
          if (global.HAS_PILL) return
          if (!wallCollider) {
            dialogWindow.openDialogWindow(Talk, 0);
            Ambient.playing = true;
            Ambient.loop = true;
            wallCollider = new BaseEntity(new GLTFShape(resources.MODEL_WALLS_COLLIDER), { position: new Vector3(3.8, 0, 56.1) })
            pill.init(wallCollider)
            ui.displayAnnouncement('Take the pill to escape the room', 6, Color4.Green());
          }

          floor.removeComponent(utils.ToggleComponent)
          //   floor1.removeComponent(utils.ToggleComponent)
          if (oneSound) {
            floor.getComponent(AudioSource).playOnce();
            oneSound = 0
          }
        }
      }
    )
  )

  new Capsule( new Transform({ position: new Vector3(12.6, 0.1, 48.5), rotation: Quaternion.Euler(0, 0, 0) }), 1.5);
  new Capsule( new Transform({ position: new Vector3(15.6, 0.1, 48.5), rotation: Quaternion.Euler(0, 0, 0) }), 1.5);
  new Capsule( new Transform({ position: new Vector3(18.6, 0.1, 48.5), rotation: Quaternion.Euler(0, 0, 0) }), 1.5);
  new Capsule( new Transform({ position: new Vector3(21.6, 0.1, 48.5), rotation: Quaternion.Euler(0, 0, 0) }), 1.5);
  new Capsule( new Transform({ position: new Vector3(24.6, 0.1, 48.5), rotation: Quaternion.Euler(0, 0, 0) }), 1.5);
  new Capsule( new Transform({ position: new Vector3(9.6, 0.1, 48.5), rotation: Quaternion.Euler(0, 0, 0) }), 1.5);
  new Capsule( new Transform({ position: new Vector3(6.6, 0.1, 48.5), rotation: Quaternion.Euler(0, 0, 0) }), 1.5);
  new Capsule( new Transform({ position: new Vector3(27.6, 0.1, 48.5), rotation: Quaternion.Euler(0, 0, 0) }), 1.5);

  new Capsule( new Transform({ position: new Vector3(12.6, 0.1, 63.5), rotation: Quaternion.Euler(0, 180, 0) }), -1.5);
  new Capsule( new Transform({ position: new Vector3(15.6, 0.1, 63.5), rotation: Quaternion.Euler(0, 180, 0) }), -1.5);
  new Capsule( new Transform({ position: new Vector3(18.6, 0.1, 63.5), rotation: Quaternion.Euler(0, 180, 0) }), -1.5);
  new Capsule( new Transform({ position: new Vector3(21.6, 0.1, 63.5), rotation: Quaternion.Euler(0, 180, 0) }), -1.5);
  new Capsule( new Transform({ position: new Vector3(24.6, 0.1, 63.5), rotation: Quaternion.Euler(0, 180, 0) }), -1.5);
  new Capsule( new Transform({ position: new Vector3(9.6, 0.1, 63.5), rotation: Quaternion.Euler(0, 180, 0) }), -1.5);
  new Capsule( new Transform({ position: new Vector3(6.6, 0.1, 63.5), rotation: Quaternion.Euler(0, 180, 0) }), -1.5);
  new Capsule( new Transform({ position: new Vector3(27.6, 0.1, 63.5), rotation: Quaternion.Euler(0, 180, 0) }), -1.5).init();

  // Create boxes
  const boxSmall = new BoxSmall(new Transform({ position: new Vector3(2.5, 1.5, 51) }))
  const boxBig = new BoxBig(new Transform({ position: new Vector3(3, 0.5, 51) }))

  const boxes: Box[] = [boxSmall, boxBig]
  const physicsSystem = new PhysicsSystem()

  boxes.forEach(box => {
    physicsSystem.addEntity(box)
    box.addComponent(
      new OnPointerDown(
        () => {
          if (boxes.filter(x => x.isActive).length === 0)
            box.playerPickup();
        },
        { hoverText: "Pick up", distance: 6, button: ActionButton.PRIMARY }
      )
    )
  })
  physicsSystem.addEntity(squid)


  // Invisible walls
  //   //#region
  const wallShape = new CANNON.Box(new CANNON.Vec3(16, 50, 0.5))
  const wallNorth = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(16, 49.5, 16),
  })
  physicsSystem.addBody(wallNorth)

  const wallSouth = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(16, 49.5, 0),
  })
  physicsSystem.addBody(wallSouth)

  const wallEast = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(16, 49.5, 16),
  })
  wallEast.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
  physicsSystem.addBody(wallEast)

  const wallWest = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(0, 49.5, 16),
  })
  wallWest.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
  physicsSystem.addBody(wallWest)

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
}