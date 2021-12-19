import resources from "../../resources";

export class Twitter extends Entity {
  constructor(transform: TranformConstructorArgs, url: string) {
    super()

    engine.addEntity(this)
    this.addComponent(new GLTFShape(resources.MODEL_TWITTER))
    this.addComponent(new Transform(transform))

    const audio = new AudioSource(new AudioClip(resources.SOUND_TWITTER))
    this.addComponent(audio)

    const action = new AnimationState("Action", { looping: false })
    const animator = new Animator()
    animator.addClip(action)
    this.addComponent(animator)


    this.addComponent(
      new OnPointerDown(() => {
          animator.getClip("Action").play()
          audio.playOnce();
          openExternalURL(url)
        },
        {
          hoverText: "Go to page",
          button: ActionButton.POINTER,
      })
    )
  }
}