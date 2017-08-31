export class Utils {

  public static round(x : number, places : number) {
    return Math.round(x * Math.pow(10, places)) / Math.pow(10, places);
  }
}