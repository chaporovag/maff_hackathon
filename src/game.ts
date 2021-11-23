import Squad from "./squad";
import Control from "./control";

const squid = new Squad({ position: new Vector3(7, 0, 8) });
const control = new Control({ position: new Vector3(5.5, -5, 3.6), rotation: Quaternion.Euler(0, 90, 0) });

control.addComponent(
  new OnPointerDown((): void => {
    squid.move(new Vector3(-2, 0, 8))
  })
)
