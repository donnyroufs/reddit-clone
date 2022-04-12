export class BaseException extends Error {
  public static mixin(msg: string) {
    return class extends BaseException {
      public constructor() {
        super(msg)
      }
    }
  }
}
