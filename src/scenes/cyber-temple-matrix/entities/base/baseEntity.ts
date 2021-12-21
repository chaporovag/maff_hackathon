export default class BaseEntity extends Entity {
	
  constructor(shape: GLTFShape, transform: TransformConstructorArgs) {
    super();

    engine.addEntity(this)
    this.addComponent(shape)
    this.addComponent(new Transform(transform))
  }

  protected addSound (sound: AudioSource) {
    const source = new Entity()
    source.addComponent(sound)
    source.setParent(this)
    engine.addEntity(source)
  }
}