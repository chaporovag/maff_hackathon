import Squid, {Move, Rotate} from "./squid";
import Control from "./control";
import BaseEntity from "./baseEntity";
import {Crate} from './crate'
import {Capsule} from "./capsule";

const squid = new Squid(new GLTFShape('models/squid.glb'), { position: new Vector3(6, 0, 8) });
const wall = new BaseEntity(new GLTFShape('models/wall10.glb'),{ position: new Vector3(3.8, 0, 8.1) });

const control1 = new Control({ position: new Vector3(3.5, -5, 3.6), rotation: Quaternion.Euler(0, 90, 0) });
const control2 = new Control({ position: new Vector3(5.5, -5, 3.6), rotation: Quaternion.Euler(0, 90, 0) });

const controlRight = new Control({ position: new Vector3(8.5, -5, 3.6), rotation: Quaternion.Euler(0, 90, 0) });
const controlLeft = new Control({ position: new Vector3(10.5, -5, 3.6), rotation: Quaternion.Euler(0, 90, 0) });

const capsule1= new Capsule(new Transform({ position: new Vector3(17,1.5,12),rotation: Quaternion.Euler(0, 0, 90), scale: new Vector3(2, 2, 2), }))
const capsule2= new Capsule(new Transform({ position: new Vector3(17,1.5,14),rotation: Quaternion.Euler(0, 0, 90), scale: new Vector3(2, 2, 2), }))
const capsule3= new Capsule(new Transform({ position: new Vector3(17,1.5,8),rotation: Quaternion.Euler(0, 0, 90), scale: new Vector3(2, 2, 2), }))
const capsule4= new Capsule(new Transform({ position: new Vector3(17,1.5,10),rotation: Quaternion.Euler(0, 0, 90), scale: new Vector3(2, 2, 2), }))


// Give it a model and move it into place
//
// control1.addComponent(
//   new OnPointerDown((): void => {
//     squid.forward()
//   })
// )

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

// followTheCamera.addComponent(new BoxShape())
// followTheCamera.addComponent(
//   new Transform({
//     position: new Vector3(2, 0.5, 1),
//   })
// )
// engine.addEntity(followTheCamera)
// let take = false;

// followTheCamera.addComponent(
// 	new OnClick(():void=>{
// 		if(!take){
// 		followTheCamera.setParent(Attachable.FIRST_PERSON_CAMERA);
// 		take = true
// 	} else {
// 		followTheCamera.setParent('');
// 	}
		
// 	})
// )

// Input.instance.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, false, (e) => log('key down', e))
// { button: ActionButton.PRIMARY }
