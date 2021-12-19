export default class Global {
  public static POSITION: Vector3 = new Vector3(0 * 16, 0, 3 * 16)
  public static HAS_KEY: boolean = false;
  public static HAS_BATTERY: boolean = false;
  public static HAS_PILL: boolean = false;
  public static IS_QUEST: boolean = false;
  public static ROBOT_IS_ACTIVE: boolean = false;
  public static TERMINAL_IS_ACTIVE: boolean = false;
  public static events: EventManager = new EventManager();
}