export enum approval_status {
  minimum,
  unapproved,
  approved,
  reject,
  reimburse,
  maximum,
}

export abstract class EntityObject<T> {
  protected props: T;

  constructor(props: T) {
    this.props = props;
  }
}

export abstract class PrimitiveObject<T> extends EntityObject<T> {
  get value(): T {
    return this.props;
  }
}

export abstract class ValueObject<T> {
  protected readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }
}
