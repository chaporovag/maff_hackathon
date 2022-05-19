export default class Wall extends Entity {

  //@ts-ignore
  private _planeShape: PlaneShape

  constructor(src: string, transform: Transform) {
    super();

    const myVideoClip = new VideoClip(src)
    const myVideoTexture = new VideoTexture(myVideoClip)
    const myMaterial = new Material()
    myMaterial.albedoColor = new Color3(1.5, 1.5, 1.5)
    myMaterial.albedoTexture = myVideoTexture
    myMaterial.roughness = 1
    myMaterial.specularIntensity = 1
    myMaterial.metallic = 0

    this._planeShape = new PlaneShape()
    this.addComponent(this._planeShape)
    this.addComponent(transform)
    this.addComponent(myMaterial)
    engine.addEntity(this)

    myVideoTexture.loop = true
    myVideoTexture.play()

    this.enableCollision(false)
  }

  public enableCollision (value: boolean): void {
    this._planeShape.withCollisions = value
  }
}