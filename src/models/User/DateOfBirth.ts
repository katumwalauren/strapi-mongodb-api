import ParseException from "../../exceptions/ParseException";

export default class DateOfBirth {
  private readonly dob: Date;

  constructor(dateOfBirth: Date) {
    this.validate(dateOfBirth);
    this.dob = dateOfBirth;
  }

  private validate(dateOfBirth: Date): void {
    if (!(dateOfBirth instanceof Date) || isNaN(dateOfBirth.getTime())) {
      throw new ParseException("Invalid date of birth");
    }

    const now = new Date();
    if (dateOfBirth.getTime() > now.getTime()) {
      throw new ParseException("Date of birth cannot be in the future");
    }

  }

  get(): Date {
    return this.dob;
  }
}
