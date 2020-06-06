export class Container {
  constructor(public value) {}
  static of = (x: any) => new Container(x)
  public map = (fn: Function) => Container.of(fn(this.value))
}
