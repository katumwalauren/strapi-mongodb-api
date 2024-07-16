import ParseException from "../../exceptions/ParseException";

export default class Email {
  private readonly email: string;

  constructor(email: string) {
    this.validate(email);
    this.email = email;
  }

  private validate(email: string): void {
    if (email.length < 3) {
      throw new ParseException("Email should be at least 3 characters.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new ParseException("Invalid email format.");
    }

    if (email.length > 254) {
      throw new ParseException("Email should be less than 255 characters.");
    }

    const disposableDomains = ["mailinator.com", "yopmail.com", "trashmail.com"];
    const emailDomain = this.getDomain(email);

    if (disposableDomains.includes(emailDomain)) {
      throw new ParseException("Disposable email addresses are not allowed.");
    }
  }

  private getDomain(email: string): string {
    return email.split("@")[1];
  }

  get(): string {
    return this.email;
  }
}
