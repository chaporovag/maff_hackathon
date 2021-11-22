export default class Control extends Entity {
  constructor(transform: TransformConstructorArgs) {
    super();

    engine.addEntity(this);

    this.addComponent(new GLTFShape('models/control.glb'));
    this.addComponent(new Transform(transform));
  }
}