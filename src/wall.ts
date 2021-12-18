export function addWall(src: string, transform: Transform): void {
  const myVideoClip = new VideoClip(src)
  const myVideoTexture = new VideoTexture(myVideoClip)
  const myMaterial = new Material()
  myMaterial.albedoColor = new Color3(1.5, 1.5, 1.5)
  myMaterial.albedoTexture = myVideoTexture
  myMaterial.roughness = 1
  myMaterial.specularIntensity = 1
  myMaterial.metallic = 0
  const screen = new Entity()
  let p = new PlaneShape()
  p.withCollisions = false
  screen.addComponent(p)
  screen.addComponent(transform)
  screen.addComponent(myMaterial)
  engine.addEntity(screen)
  myVideoTexture.loop = true
  myVideoTexture.play()
}