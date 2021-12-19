import * as utils from '@dcl/ecs-scene-utils'
import BaseEntity from "./base/baseEntity";
import Pill from "./entities/pill";
import Robot from "./entities/robot";
import Terminal from "./entities/terminal";
import Wall from "./entities/wall";
import global from "./core/global";
import {Capsule} from "./entities/capsule";
import {Box} from "./entities/box";
import {BoxSmall} from "./entities/boxSmall";
import PhysicsSystem from "./systems/physicsSystem";
import {BoxBig} from "./entities/boxBig";
import {Like} from "./services/Like/Like";
import resources from "./resources";
import {Floor} from "./entities/floor";
import NPC from "./entities/npc";
import {EventMessage, QuestStateChangedEvent} from "./events/CustomEvents";

export function createCyberTempleMatrix(): void {
  const like = new Like(
    {
      position: new Vector3(global.POSITION.x + 31, 0.75, global.POSITION.z + 10),
      rotation: Quaternion.Euler(0, 90, 0),
    },
    '61b905d2dd08def8380abab9'
  )

  const start = new Entity()
  start.addComponent(new Transform({position: new Vector3(global.POSITION.x + 8,11,global.POSITION.z + 8)}))
  engine.addEntity(start)


  const ambient = start.addComponent(new AudioSource(new AudioClip(resources.SOUND_AMBIENT)))
  ambient.loop = true;

  const robot = new Robot(new Transform({ position: new Vector3(global.POSITION.x + 6,0.1,global.POSITION.z + 10), rotation: Quaternion.Euler(0, 60, 0)}));
  const terminal = new Terminal({ position: new Vector3(global.POSITION.x + 4,0.08,global.POSITION.z + 3), rotation: Quaternion.Euler(0, 315, 0) })
  terminal.init(robot)

  const pill = new Pill(new Transform({ position: new Vector3(global.POSITION.x + 12, 7.5, global.POSITION.z + 6) }));
  const floor = new Floor({ position: new Vector3(global.POSITION.x + 8, 0.1, global.POSITION.z + 8) })

  // roof
  new BaseEntity(new GLTFShape(resources.MODEL_FLOOR), { position: new Vector3(global.POSITION.x + 8, 9.9, global.POSITION.z + 8), rotation: Quaternion.Euler(180, 90, 0)});
  new BaseEntity(new GLTFShape(resources.MODEL_FLOOR), { position: new Vector3(global.POSITION.x + 22.88, 9.9, global.POSITION.z + 8), rotation: Quaternion.Euler(180, 90, 0), scale: new Vector3(1, 1, .885)});

  const walls: Wall[] = [
    new Wall(
      resources.VIDEO_WALL,
      new Transform({
        position: new Vector3(global.POSITION.x + 29.9, 5, global.POSITION.z + 8),
        scale: new Vector3(15.8, 10, 1),
        rotation: Quaternion.Euler(0, 270, 0)
      })
    ),
    new Wall(
      resources.VIDEO_WALL,
      new Transform({
        position: new Vector3(global.POSITION.x + 0.1, 5, global.POSITION.z + 8),
        scale: new Vector3(15.8, 10, 1),
        rotation: Quaternion.Euler(0, 90, 0)
      })
    ),
    new Wall(
      resources.VIDEO_WALL,
      new Transform({
        position: new Vector3(global.POSITION.x + 8, 5, global.POSITION.z + 15.9),
        scale: new Vector3(15.8, 10, 1),
        rotation: Quaternion.Euler(0, 0, 0)
      })
    ),
    new Wall(
      resources.VIDEO_WALL,
      new Transform({
        position: new Vector3(global.POSITION.x + 8, 5, global.POSITION.z + 0.1),
        scale: new Vector3(15.8, 10, 1),
        rotation: Quaternion.Euler(0, 180, 0)
      })
    ),
    new Wall(
      resources.VIDEO_WALL,
      new Transform({
        position: new Vector3(global.POSITION.x + 22, 5, global.POSITION.z + 15.9),
        scale: new Vector3(15.8, 10, 1),
        rotation: Quaternion.Euler(0, 0, 0)
      })
    ),
    new Wall(
      resources.VIDEO_WALL,
      new Transform({
        position: new Vector3(global.POSITION.x + 22, 5, global.POSITION.z + 0.1),
        scale: new Vector3(15.8, 10, 1),
        rotation: Quaternion.Euler(0, 180, 0)
      })
    )
  ]

  const npc: NPC = new NPC()
  floor.addComponent(
    new utils.TriggerComponent(
      new utils.TriggerBoxShape(
        new Vector3(30, 12, 16), // size
        new Vector3(global.POSITION.x + 15, 6, global.POSITION.z + 8) // position
      ),
      {
        onCameraEnter: () => {
          if (global.HAS_PILL) return
          if (!global.IS_QUEST) npc.start()
          if (global.HAS_KEY && !global.TERMINAL_IS_ACTIVE) terminal.setKeyIconVisible(true)
          if (global.HAS_BATTERY && !global.ROBOT_IS_ACTIVE) robot.setBatteryIconVisible(true)
          npc.show()

        },
        onCameraExit: () => {
          npc.hide()
          terminal.setKeyIconVisible(false)
          robot.setBatteryIconVisible(false)
          ambient.playing = false
        }
      }
    )
  )

  global.events.addListener(QuestStateChangedEvent, null, ({ message }) => {
    if (message === EventMessage.QUEST_START) {
      ambient.playing = true
      global.IS_QUEST = true
      walls.forEach(wall => wall.enableCollision(true))
      if (!global.TERMINAL_IS_ACTIVE) {
        if (global.HAS_KEY) {
          terminal.setKeyIconVisible(true)
        } else {
          terminal.setKeyVisible(true)
        }
      }
      if (!global.ROBOT_IS_ACTIVE) {
        if (global.HAS_BATTERY) {
          robot.setBatteryIconVisible(true)
        } else {
          robot.setBatteryVisible(true)
        }
      }
    }

    if (message === EventMessage.QUEST_END) {
      ambient.playing = false
      global.IS_QUEST = false
      walls.forEach(wall => wall.enableCollision(false))
      if (!global.TERMINAL_IS_ACTIVE) {
        if (global.HAS_KEY) {
          terminal.setKeyIconVisible(false)
        } else {
          terminal.setKeyVisible(false)
        }
      }
      if (!global.ROBOT_IS_ACTIVE) {
        if (global.HAS_BATTERY) {
          robot.setBatteryIconVisible(false)
        } else {
          robot.setBatteryVisible(false)
        }
      }
    }
  })

  new Capsule( new Transform({ position: new Vector3(global.POSITION.x + 12.6, 0.1, global.POSITION.z + 0.5), rotation: Quaternion.Euler(0, 0, 0) }), 1.5);
  new Capsule( new Transform({ position: new Vector3(global.POSITION.x + 15.6, 0.1, global.POSITION.z + 0.5), rotation: Quaternion.Euler(0, 0, 0) }), 1.5);
  new Capsule( new Transform({ position: new Vector3(global.POSITION.x + 18.6, 0.1, global.POSITION.z + 0.5), rotation: Quaternion.Euler(0, 0, 0) }), 1.5);
  new Capsule( new Transform({ position: new Vector3(global.POSITION.x + 21.6, 0.1, global.POSITION.z + 0.5), rotation: Quaternion.Euler(0, 0, 0) }), 1.5);
  new Capsule( new Transform({ position: new Vector3(global.POSITION.x + 24.6, 0.1, global.POSITION.z + 0.5), rotation: Quaternion.Euler(0, 0, 0) }), 1.5);
  new Capsule( new Transform({ position: new Vector3(global.POSITION.x + 9.6, 0.1, global.POSITION.z + 0.5), rotation: Quaternion.Euler(0, 0, 0) }), 1.5);
  new Capsule( new Transform({ position: new Vector3(global.POSITION.x + 6.6, 0.1, global.POSITION.z + 0.5), rotation: Quaternion.Euler(0, 0, 0) }), 1.5);
  new Capsule( new Transform({ position: new Vector3(global.POSITION.x + 27.6, 0.1, global.POSITION.z + 0.5), rotation: Quaternion.Euler(0, 0, 0) }), 1.5);

  new Capsule( new Transform({ position: new Vector3(global.POSITION.x + 12.6, 0.1, global.POSITION.z + 15.5), rotation: Quaternion.Euler(0, 180, 0) }), -1.5);
  new Capsule( new Transform({ position: new Vector3(global.POSITION.x + 15.6, 0.1, global.POSITION.z + 15.5), rotation: Quaternion.Euler(0, 180, 0) }), -1.5);
  new Capsule( new Transform({ position: new Vector3(global.POSITION.x + 18.6, 0.1, global.POSITION.z + 15.5), rotation: Quaternion.Euler(0, 180, 0) }), -1.5);
  new Capsule( new Transform({ position: new Vector3(global.POSITION.x + 21.6, 0.1, global.POSITION.z + 15.5), rotation: Quaternion.Euler(0, 180, 0) }), -1.5);
  new Capsule( new Transform({ position: new Vector3(global.POSITION.x + 24.6, 0.1, global.POSITION.z + 15.5), rotation: Quaternion.Euler(0, 180, 0) }), -1.5);
  new Capsule( new Transform({ position: new Vector3(global.POSITION.x + 9.6, 0.1, global.POSITION.z + 15.5), rotation: Quaternion.Euler(0, 180, 0) }), -1.5);
  new Capsule( new Transform({ position: new Vector3(global.POSITION.x + 6.6, 0.1, global.POSITION.z + 15.5), rotation: Quaternion.Euler(0, 180, 0) }), -1.5);
  new Capsule( new Transform({ position: new Vector3(global.POSITION.x + 27.6, 0.1, global.POSITION.z + 15.5), rotation: Quaternion.Euler(0, 180, 0) }), -1.5).init();

  // Create boxes
  const boxSmall = new BoxSmall(new Transform({ position: new Vector3(global.POSITION.x + 2.5, 1.5, global.POSITION.z + 14) }))
  const boxBig = new BoxBig(new Transform({ position: new Vector3(global.POSITION.x + 3, 0.5, global.POSITION.z + 14) }))

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
  physicsSystem.addEntity(robot)


  // Invisible physics walls
  /*
  const wallShape = new CANNON.Box(new CANNON.Vec3(16, 50, 0.5))
  const wallNorth = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(global.POSITION.x + 16, 49.5, global.POSITION.z + 16),
  })
  physicsSystem.addBody(wallNorth)

  const wallSouth = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(global.POSITION.x + 16, 49.5, global.POSITION.z + 0),
  })
  physicsSystem.addBody(wallSouth)

  const wallEast = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(global.POSITION.x + 16, 49.5, 16),
  })
  wallEast.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, global.POSITION.z + 0), -Math.PI / 2)
  physicsSystem.addBody(wallEast)

  const wallWest = new CANNON.Body({
    mass: 0,
    shape: wallShape,
    position: new CANNON.Vec3(global.POSITION.x + 0, 49.5, global.POSITION.z + 16),
  })
  wallWest.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
  physicsSystem.addBody(wallWest)
  */
  // Controls
  // "E" key up
  Input.instance.subscribe("BUTTON_UP", ActionButton.PRIMARY, false, (e) => {
    robot.rotate();
    robot.move();
  })

  // "MOUSE LEFT" is up
  Input.instance.subscribe("BUTTON_UP", ActionButton.POINTER, false, (e) => {
    robot.rotate();
    robot.move();
    boxes.forEach(box => {
      if (box.isActive) {
        const throwDirection = Vector3.Forward().rotate(Camera.instance.rotation)
        box.playerDrop(throwDirection)
      }
    })
  })
}