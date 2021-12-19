import {Dialog, DialogWindow} from "@dcl/npc-scene-utils";
import resources from "../resources";
import global from "../core/global";
import {EventMessage, QuestStateChangedEvent} from "../events/customEvents";

export default class NPC {

  private _dialogWindow: DialogWindow
  private _canvas: UICanvas
  private _morfImage: UIImage
  private _ruImage: UIImage
  private _ruDescImage: UIImage

  constructor() {
    this._dialogWindow = new DialogWindow()

    const canvas = new UICanvas()

    const morfImage = new UIImage(canvas, new Texture(resources.IMAGE_MORF))
    morfImage.name = "clickable-image"
    morfImage.hAlign = 'right'
    morfImage.positionY = 200
    morfImage.width = "100px"
    morfImage.height = "90px"
    morfImage.sourceWidth = 200
    morfImage.sourceHeight = 173
    morfImage.isPointerBlocker = true
    morfImage.onClick = new OnClick(() => {
      this.start()
    })

    const ruImage = new UIImage(canvas, new Texture(resources.IMAGE_RU))
    ruImage.name = "clickable-image"
    ruImage.hAlign = 'right'
    ruImage.positionX = -15
    ruImage.positionY = 280
    ruImage.width = "73px"
    ruImage.height = "40px"
    ruImage.sourceWidth = 73
    ruImage.sourceHeight = 40
    ruImage.isPointerBlocker = true

    ruImage.onClick = new OnClick(() => {
      ruDescImage.visible = true
    })


    const ruDescImage = new UIImage(canvas, new Texture(resources.IMAGE_RU_DESC))
    ruDescImage.width = "0px"
    ruDescImage.name = "clickable-image"
    ruDescImage.width = "890px"
    ruDescImage.height = "447px"
    ruDescImage.sourceWidth = 890
    ruDescImage.sourceHeight = 447
    ruDescImage.isPointerBlocker = true
    ruDescImage.visible = false
    ruDescImage.onClick = new OnClick(() => {
      ruDescImage.visible = false
    })

    this._canvas = canvas
    this._morfImage = morfImage
    this._ruImage = ruImage
    this._ruDescImage = ruDescImage

    this.hide()
  }

  public setMorfVisible (value: boolean): void {
    this._morfImage.visible = value
  }

  public setRuVisible (value: boolean): void {
    this._ruImage.visible = value
  }

  public hide (): void {
    this._morfImage.visible = false
    this._ruImage.visible = false
    this._dialogWindow.closeDialogWindow()
  }

  public start (): void {
    this._dialogWindow.openDialogWindow(this._getTalk(), 0);
  }

  private _getTalk (): Dialog[] {
    return [
      {
        text: 'Welcome, adventurer! Choose a mode: complete the matrix quest or look around the cyber temple',
        isQuestion: true,
        buttons: [
          {
            label: 'Just watch', goToDialog: 1,
            triggeredActions: () => {
              global.events.fireEvent(new QuestStateChangedEvent(EventMessage.QUEST_END))
            }
          }, {
            label: 'Quest', goToDialog: 2,
            triggeredActions: () => {
              global.events.fireEvent(new QuestStateChangedEvent(EventMessage.QUEST_START))
            }
          }
        ],
        offsetX: 30,
        portrait: {
          path: resources.IMAGE_MORF,
          height: 173,
          width: 200,
          offsetX: 50,
          section: {
            sourceHeight: 173,
            sourceWidth: 200,
          },
        },
      },
      {
        text: `Look around!`,
        isEndOfDialog: true,
        offsetX: 30,
        portrait: {
          path: resources.IMAGE_MORF,
          height: 173,
          width: 200,
          offsetX: 50,
          section: {
            sourceHeight: 173,
            sourceWidth: 200,
          },
        },
      },
      {
        text: `Now I show you how deep the rabbit-hole goes! To leave this place, you need to find the red pill`,
        offsetX: 30,
        portrait: {
          path: resources.IMAGE_MORF,
          height: 173,
          width: 200,
          offsetX: 50,
          section: {
            sourceHeight: 173,
            sourceWidth: 200,
          },
        },
      },
      {
        text: `At first, you need to look around to get control panel key and find energy block for mechanical creature`,
        offsetX: 30,
        portrait: {
          path: resources.IMAGE_MORF,
          height: 173,
          width: 200,
          offsetX: 50,
          section: {
            sourceHeight: 173,
            sourceWidth: 200,
          },
        },
      },
      {
        text: `Then use the key to activate control panel and move creature under the pill. Use boxes to jump higher! Good luck!`,
        isEndOfDialog: true,
        offsetX: 30,
        portrait: {
          path: resources.IMAGE_MORF,
          height: 173,
          width: 200,
          offsetX: 50,
          section: {
            sourceHeight: 173,
            sourceWidth: 200,
          },
        },
      }
    ]
  }
}

