import { describe, expect, test } from "@jest/globals";
import Name from "../../../models/User/Name";
import ParseException from "../../../exceptions/ParseException";

describe("Name", () => {
  describe("constructor", () => {
    describe("when a valid name is provided", () => {
      test("creates a Name instance", () => {
        const name = new Name("John Doe");
        expect(name.get()).toBe("John Doe");
      });
    });

    describe("when an invalid name is provided", () => {
      test("throws an exception for a name with less than 3 characters", () => {
        expect(() => new Name("Jo")).toThrow(
          new ParseException("Name should be at least 3 characters")
        );
      });

      test("throws an exception for a name with more than 100 characters", () => {
        const longName = "J".repeat(101);
        expect(() => new Name(longName)).toThrow(
          new ParseException("Name should be less than 100 characters")
        );
      });
    });
  });
});


