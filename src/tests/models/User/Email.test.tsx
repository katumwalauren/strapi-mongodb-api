import { describe, expect, test } from "@jest/globals";
import Email from "../../../models/User/Email";
import ParseException from "../../../exceptions/ParseException";

describe("Email", () => {
  test("can be constructed with a valid email", () => {
    const email = new Email("john@gmail.com");
    expect(email).toBeInstanceOf(Email);
    expect((email as any).value).toBe("john@gmail.com");
  });

  test("throws an exception for an invalid email", () => {
    expect(() => new Email("invalid-email")).toThrow(ParseException);
  });

  test("throws an exception for an empty email", () => {
    expect(() => new Email("")).toThrow(ParseException);
  });

  test("validates email format correctly", () => {
    const validEmails = ["test@example.com", "user.name@domain.co", "user+name@domain.com"];
    const invalidEmails = ["plainaddress", "@missingusername.com", "username@.com"];

    validEmails.forEach(email => {
      expect(() => new Email(email)).not.toThrow(ParseException);
    });

    invalidEmails.forEach(email => {
      expect(() => new Email(email)).toThrow(ParseException);
    });
  });
});
