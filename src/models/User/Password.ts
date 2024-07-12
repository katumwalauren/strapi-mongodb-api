import ParseException from "../../exceptions/ParseException";

export default class Password {
  private readonly password: string;

  constructor(password: string) {
    this.validate(password);
    this.password = password;
  }

  private validate(password: string): void {
    if (password.length < 8) {
      throw new ParseException("Password should be at least 8 characters");
    }

  }

  get(): string {
    return this.password;
  }
}
