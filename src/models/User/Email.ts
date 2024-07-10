import ParseException from "../../exceptions/ParseException";

export default class Email {
  private readonly email: string;

  constructor(email: string) {
    this.validate(email);
    this.email = email;
  }

  private validate(email: string): void {
    if (email.length < 3) {
      throw new ParseException("Email should be at least 3 characters");
    }
    // TODO: add more email validations here
  }

  get(): string {
    return this.email;
  }
}
