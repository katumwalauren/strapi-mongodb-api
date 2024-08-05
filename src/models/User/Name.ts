
import ParseException from "../../exceptions/ParseException";

export default class Name {
  private readonly name: string;

  constructor(name: string) {
    this.validate(name);
    this.name = name;
  }

  private validate(name: string): void {
    if (name.length < 3) {
      throw new ParseException("Name should be at least 3 characters");
    }

    if (name.length > 100) {
      throw new ParseException("Name should be less than 100 characters");
    }
  }

  get(): string {
    return this.name;
  }
}
