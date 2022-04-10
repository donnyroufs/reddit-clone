export class Prop {
  public constructor(
    public key: string,
    public dataType: "string" | "number" | "any"
  ) {}
}

export class Transformer {
  public constructor(private readonly _props: Prop[]) {}

  public transform(raw: Record<string, unknown>) {
    return Object.entries(raw).reduce((acc: any, curr) => {
      let [k, v] = curr

      if (!this.isAllowedProperty(k)) {
        return acc
      }

      v = this.parseDataType(k, v)

      acc[k] = v

      return acc
    }, {})
  }

  private parseDataType(k: string, v: any) {
    const prop = this._props.find((prop) => prop.key === k)!
    const isRightDataType = typeof v === prop.dataType

    if (prop.dataType == "any") {
      return v
    }

    if (!isRightDataType && prop.dataType === "string") {
      v = "" + v
    } else if (!isRightDataType && prop.dataType === "number") {
      v = Number.parseInt(v)
    }

    return v
  }

  private isAllowedProperty(key: string) {
    return this._props.some((prop) => prop.key === key)
  }
}
