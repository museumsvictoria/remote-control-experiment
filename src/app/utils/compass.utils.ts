export class CompassUtils {


  public static GetDeltaAngle(from: number, to: number): number {


    var deltaAngle = from - to;

    if (deltaAngle < 0) {
      deltaAngle += 360
    }

    var screen_portrait = (window.innerWidth < window.innerHeight);

    if (screen_portrait) {
      if (deltaAngle > 180) deltaAngle = deltaAngle - 360;
    } else {
      if (deltaAngle < -180) deltaAngle = 360 + deltaAngle;
    }

    return deltaAngle;

  }
}
