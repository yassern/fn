export class Either {
  constructor(public value) {}
  static of = (x: any) => new Right(x)
}

export class Left extends Either {
  public map = (fn: Function) => this
}

export class Right extends Either {
  public map = (fn: Function) => Either.of(fn(this.value))
}

export const left = x => new Left(x)
