import { describe, expect, test } from "@jest/globals";
import { parseJson } from "../../Json/parser";
import ParseException from "../../exceptions/ParseException";

describe("Json", () => {
  describe("parseJson", () => {
    describe("when valid non-null json is provided", () => {
      test("returns valid json", () => {
        const json = {
          name: "John Doe",
          email: "john@gmail.com",
        };

        const user = parseJson(json, ["name", "email"]);

        expect(user).toEqual({
          name: "John Doe",
          email: "john@gmail.com",
        });
      });
    });

    describe("when invalid user json is provided", () => {
      describe("when json is missing an expected key", () => {
        test("throw exception", () => {
          const json = {
            email: "john@gmail.com",
          };

          expect(() => parseJson(json, ["name", "email"])).toThrow(
            new ParseException("Json has missing keys: name")
          );
        });
      });

      describe("when json has extra key", () => {
        test("throw exception", () => {
          const json = {
            name: "John Doe",
            email: "john@gmail.com",
            city: "kampala",
          };

          expect(() => parseJson(json, ["name", "email"])).toThrow(
            new ParseException("Json has unexpected keys: city")
          );
        });
      });


      describe("when json has a null key", () => {
        test("throw exception", () => {
          const json = {
            name: null,
            email: "john@gmail.com",
          };

          expect(() => parseJson(json, ["name", "email"])).toThrow(
            new ParseException("name should not be null")
          );
        });
      });

      describe("when json has an undefined key", () => {
        test("throw exception", () => {
          const json = {
            name: undefined,
            email: "john@gmail.com"
          };

          expect(() => parseJson(json, ["name", "email"])).toThrow(
            new ParseException("name should not be undefined")
          );
        });
      });
    });
  });
});