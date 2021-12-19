export default class Global {
  public static POSITION: Vector2 = new Vector2(2 * 16, 3 * 16)
  public static HAS_KEY: boolean = false;
  public static HAS_BATTERY: boolean = false;
  public static HAS_PILL: boolean = false;
  public static QUEST: boolean = false;
  public static _isActive: boolean = false;
  public static events: EventManager = new EventManager();
}