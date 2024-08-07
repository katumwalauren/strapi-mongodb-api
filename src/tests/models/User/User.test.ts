import { describe, expect, test } from "@jest/globals";
import { decode, encode } from "../../../models/User";
import Name from "../../../models/User/Name";
import Email from "../../../models/User/Email";
import ParseException from "../../../exceptions/ParseException";
import Password from "../../../models/User/Password";
import DateOfBirth from "../../../models/User/DateOfBirth";

describe("User", () => {
  describe("decode", () => {
    describe("when valid user json is provided", () => {
      test("returns a valid user object", () => {
        const userJson = {
          name: "John Doe",
          email: "john@gmail.com",
          dateOfBirth: "1990-01-01",
          password: "Password1!",
        };

        const user = decode(userJson);

        expect(user).toEqual({
          name: new Name("John Doe"),
          email: new Email("john@gmail.com"),
          dateOfBirth: new DateOfBirth(new Date("1990-01-01")),
          password: new Password("Password1!"),
        });
      });
    });

    describe("when invalid user json is provided", () => {
      describe("when json is missing a key", () => {
        test("throws exception", () => {
          const userJson = {
            email: "john@gmail.com",
            dateOfBirth: "1990-01-01",
            password: "Password1!",
          };

          expect(() => decode(userJson)).toThrow(
            new ParseException("Json has missing keys: name")
          );
        });
      });

      describe("when json has an extra key", () => {
        test("throws exception", () => {
          const userJson = {
            name: "John Doe",
            email: "john@gmail.com",
            dateOfBirth: "1990-01-01",
            password: "Password1!",
            city: "Kampala",
          };

          expect(() => decode(userJson)).toThrow(
            new ParseException("Json has unexpected keys: city")
          );
        });
      });
    });
  });

  describe("encode", () => {
    describe("when a valid user is provided", () => {
      test("returns a valid user json", () => {
        const user = {
          name: new Name("John Doe"),
          email: new Email("john@gmail.com"),
          dateOfBirth: new DateOfBirth(new Date("1990-01-01")),
          password: new Password("Password1!"),
        };

        const userJson = encode(user);

        expect(userJson).toEqual({
          name: "John Doe",
          email: "john@gmail.com",
          dateOfBirth: "1990-01-01",
          password: "Password1!",
        });
      });
    });
  });
});
