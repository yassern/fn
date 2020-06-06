import { isNil } from 'ramda'

export class Maybe {
  constructor(public value) {}
  static of = (x: any) => new Maybe(x)
  private isNothing = () => isNil(this.value)
  public map = (fn: Function) =>
    this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.value))
}
