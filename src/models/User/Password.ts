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

    if (!/[A-Z]/.test(password)) {
      throw new ParseException("Password should contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      throw new ParseException("Password should contain at least one lowercase letter");
    }

    if (!/[0-9]/.test(password)) {
      throw new ParseException("Password should contain at least one digit");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      throw new ParseException("Password should contain at least one special character");
    }
  }

  get(): string {
    return this.password;
  }
}
