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
    }

  get(): string {
    return this.email;
  }
}
