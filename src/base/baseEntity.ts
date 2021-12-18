import { Box } from "cannon";
import Global from "../core/global";
import global from "../core/global";
export default class BaseEntity extends Entity {
	
  constructor(shape: GLTFShape, transform: TransformConstructorArgs) {
    super();
	//  this.addComponent(
	// 	new OnClick((): void => {
	// 		if(Global.QUEST) {
	// 		this.getComponent(Transform).scale.setAll(0);}
	// 		},
	// 		{
	// 			distance: 4
	// 		}
	// 	)
	// )
    engine.addEntity(this);
    this.addComponent(shape)
    this.addComponent(new Transform(transform))
	 
// 	 if(global.QUEST){
// 		this.getComponent(Transform).scale.setAll(0)
	
// }
  }
public  removeAll(){
// engine.removeEntity(this)
this.getComponent(Transform).scale.setAll(0);
// this.addComponent(new BoxShape());
// this.addComponent(new Transform({ position: new Vector3(8, 8, 8) }))
// const Sound = new Entity();
//       engine.addEntity(Sound);
//       Sound.addComponent(new AudioSource(new AudioClip("audio/insert_card.mp3")))
//       Sound.getComponent(AudioSource).playOnce();
  }
	  
}