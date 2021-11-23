import Squad from "./squad";
import Control from "./control";

const squid = new Squad({ position: new Vector3(6, 0, 8) });
const control = new Control({ position: new Vector3(3.5, -5, 2.1), rotation: Quaternion.Euler(0, 180, 0) });

control.addComponent(
  new OnPointerDown((): void => {
    squid.move(new Vector3(-1.5, 0, 8))
  })
)
