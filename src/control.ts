import BaseEntity from "./base/baseEntity";

export default class Control extends BaseEntity {
  constructor(transform: TransformConstructorArgs) {
    super(new GLTFShape('models/control.glb'), transform);
  }
}