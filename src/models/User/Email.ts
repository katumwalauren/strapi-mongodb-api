

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ParseException("Invalid email format");
    }

    if (!email.endsWith("@example.com")) {
      throw new ParseException("Email domain must be @example.com");
    }

    if (email.length > 254) {
      throw new ParseException("Email should be less than 255 characters");
    }

    const disposableDomains = ["mailinator.com", "yopmail.com", "trashmail.com"];
    const emailDomain = email.split("@")[1];
    if (disposableDomains.includes(emailDomain)) {
      throw new ParseException("Disposable email addresses are not allowed");
    }

    const commonTypos: { [key: string]: string } = { 
      "gnail.com": "gmail.com", 
      "hotnail.com": "hotmail.com" 
    };
    if (emailDomain in commonTypos) {
      throw new ParseException(`Did you mean ${email.split("@")[0]}@${commonTypos[emailDomain]}?`);
    }
  }

  get(): string {
    return this.email;
  }
}

