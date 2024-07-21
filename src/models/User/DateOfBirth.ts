import ParseException from "../../exceptions/ParseException";

export default class DateOfBirth {
  private readonly dob: Date;

  constructor(dateOfBirth: Date) {
    this.validate(dateOfBirth);
    this.dob = dateOfBirth;
  }

  private validate(dateOfBirth: Date): void {
    const now = new Date();
    
    if (dateOfBirth.getTime() > now.getTime()) {
      throw new ParseException("Date of birth cannot be in the future");
    }

    const minAgeDate = new Date(now.setFullYear(now.getFullYear() - 18));
    if (dateOfBirth.getTime() > minAgeDate.getTime()) {
      throw new ParseException("User must be at least 18 years old");
    }
  }

  getFormattedDate(): string {
    return this.dob.toISOString().split('T')[0];
  }
}
