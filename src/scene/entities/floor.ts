import BaseEntity from "./base/baseEntity";
import resources from "../resources";
import global from "../core/global";

export class Floor extends Entity {
  constructor (transform: TransformConstructorArgs) {
    super()
    const position = transform.position as Vector3
    new BaseEntity(new GLTFShape(resources.MODEL_FLOOR), { position: new Vector3(position.x, 0.01, position.z), rotation: Quaternion.Euler(0, 90, 0) });
    new BaseEntity(new GLTFShape(resources.MODEL_FLOOR), { position: new Vector3(position.x + 15.8, 0.01, position.z), rotation: Quaternion.Euler(0, 90, 0)});
    engine.addEntity(this)
  }
}
