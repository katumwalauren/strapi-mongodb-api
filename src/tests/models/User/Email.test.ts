import { describe, expect, test } from "@jest/globals";
import Email from "../../../models/User/Email";
import ParseException from "../../../exceptions/ParseException";

describe("Email", () => {
  test("can be constructed with valid emails", () => {
    const validEmails = ["john@gmail.com", "test@example.com", "user.name@domain.co", "user+name@domain.com"];

    validEmails.forEach(email => {
      const emailInstance = new Email(email);
      expect(emailInstance.get()).toBe(email);
    });
  });

  test("throws an exception for an invalid email", () => {
    const invalidEmails = ["plainaddress", "@missingusername.com", "username@.com", "invalid-email"];

    invalidEmails.forEach(email => {
      expect(() => new Email(email)).toThrow(ParseException);
    });
  });

  test("throws an exception for an empty email", () => {
    expect(() => new Email("")).toThrow(ParseException);
  });
});
