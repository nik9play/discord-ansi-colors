export enum ForegroundColors {
  None = 0,
  Gray = 30,
  Red = 31,
  Green = 32,
  Yellow = 33,
  Blue = 34,
  Pink = 35,
  Cyan = 36,
  White = 37
}

export enum BackgroundColors {
  None = 0,
  FireflyDarkBlue = 40,
  Orange = 41,
  MarbleBlue = 42,
  GreyishTurquoise = 43,
  Gray = 44,
  Indigo = 45,
  LightGray = 46,
  White = 47
}

export enum Styles {
  Normal = 0,
  Bold = 1,
  Underline = 4,
  UnderlinedBold = '1;4'
}

export type TextColorBuilderOptions = {
  resetStyles: boolean
}

export class TextColorBuilder {
  private content = '```ansi\n'
  private currentStyle = Styles.Normal
  private currentForegroundColor = ForegroundColors.None
  private currentBackgroundColor = BackgroundColors.None

  public options: TextColorBuilderOptions

  constructor(options?: Partial<TextColorBuilderOptions>) {
    const defaults: TextColorBuilderOptions = {
      resetStyles: false
    }
    this.options = Object.assign({}, defaults, options)
  }

  public setForegroundColor(color: ForegroundColors) {
    this.currentForegroundColor = color
    return this
  }

  public setBackgroundColor(color: BackgroundColors) {
    this.currentBackgroundColor = color
    return this
  }

  public setStyle(style: Styles) {
    this.currentStyle = style
    return this
  }

  public resetStyles() {
    this.currentStyle = Styles.Normal
    this.currentForegroundColor = ForegroundColors.None
    this.currentBackgroundColor = BackgroundColors.None
  }

  public addText(text: string) {
    if (
      this.currentStyle === Styles.Normal &&
      this.currentForegroundColor === ForegroundColors.None &&
      this.currentBackgroundColor === BackgroundColors.None
    ) {
      this.content += text
      return this
    }

    this.content += `\u001b[`

    if (this.currentStyle !== Styles.Normal) {
      this.content += `${this.currentStyle}`
    }

    if (this.currentForegroundColor !== ForegroundColors.None) {
      if (this.currentStyle !== Styles.Normal) this.content += ';'

      this.content += `${this.currentForegroundColor}`
    }

    if (this.currentBackgroundColor !== BackgroundColors.None) {
      if (this.currentForegroundColor !== ForegroundColors.None) this.content += ';'

      this.content += `${this.currentBackgroundColor}`
    }

    this.content += `m${text}\u001b[0m`

    if (this.options.resetStyles) this.resetStyles()

    return this
  }

  public toString(): string {
    this.content += '\n```'
    return this.content
  }
}
