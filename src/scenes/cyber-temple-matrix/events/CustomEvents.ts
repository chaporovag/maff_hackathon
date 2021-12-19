export enum EventMessage {
  CAPSULE_OPEN = "CAPSULE_OPEN",
  QUEST_START = "QUEST_START",
  QUEST_END = "QUEST_END",
}

@EventConstructor()
class CustomEvents {
  public message: string
  constructor(message: EventMessage) {
    this.message = message
  }
}

@EventConstructor()
class QuestStateChangedEvent {
  public message: string
  constructor(message: EventMessage) {
    this.message = message
  }
}

export {
  CustomEvents,
  QuestStateChangedEvent
}