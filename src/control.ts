import BaseEntity from "./base/baseEntity";
import { Battery } from "./battery";
export default class Control extends BaseEntity {
  constructor(transform: TransformConstructorArgs) {
    super(new GLTFShape('models/control.glb'), transform);
  }
public notBatteryTake() {
	
	this.addComponent(
		new OnPointerDown(
			() => {
				
			},
			{
				button: ActionButton.PRIMARY,
				hoverText: "No battery",
				distance: 5
			}
		)
	 )
}
}