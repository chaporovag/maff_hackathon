import Squad from "./squad";
import Control from "./control";
import BaseEntity from "./baseEntity";
import { Crate } from './crate'
const squid = new Squad(new GLTFShape('models/squid.glb'), { position: new Vector3(6, 0, 8) });
const wall = new BaseEntity(new GLTFShape('models/wall10.glb'),{ position: new Vector3(3.8, 0, 8.1) });

const control1 = new Control({ position: new Vector3(5.5, -5, 3.6), rotation: Quaternion.Euler(0, 90, 0) });
const control2 = new Control({ position: new Vector3(7.5, -5, 3.6), rotation: Quaternion.Euler(0, 90, 0) });
const controlLeft = new Control({ position: new Vector3(3.5, -5, 3.6), rotation: Quaternion.Euler(0, 90, 0) });
const controlRight = new Control({ position: new Vector3(9.5, -5, 3.6), rotation: Quaternion.Euler(0, 90, 0) });
// const followTheCamera = new Entity()

// control1.addComponent(
//   new OnPointerDown((): void => {
//     squid.forward()
//   })
// )

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
controlRight.addComponent(
	new OnPointerDown((): void => {
	  squid.turnR()
	},)
 )
 controlRight.addComponent(
	new OnPointerUp((): void => {
	 squid.turnStop();
	
	})
 )
 controlLeft.addComponent(
	new OnPointerDown((): void => {
	  squid.turnL()
	},)
 )
 
 controlLeft.addComponent(
	new OnPointerUp((): void => {
	 squid.turnStop();
	 
	})
 )

const crate = new Crate(
  new Transform({
    position: new Vector3(8, 0.5, 12),
  })
)
const crate1 = new Crate(
	
  new Transform({
    position: new Vector3(6, 0.5, 12),
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