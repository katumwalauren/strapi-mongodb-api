import { Json, parseJson } from "../Json/parser";
import Email from "./User/Email";
import Name from "./User/Name";
import DateOfBirth from "./User/DateOfBirth";
import Password from "./User/Password";

export interface User {
  name: Name;
  email: Email;
  dateOfBirth: DateOfBirth;
  password: Password;
}

export type UserJson = Record<string, string>;

export function decode(json: Json): User {
  const body = parseJson(json, ["name", "email", "dateOfBirth", "password"]);

    return {
      name: new Name(body.name as string),
      email: new Email(body.email as string),
      dateOfBirth: new DateOfBirth(new Date(body.dateOfBirth as string)),
      password: new Password(body.password as string),
    };
}

export function encode(user: User): UserJson {
  return {
    name: user.name.get(),
    email: user.email.get(),
    dateOfBirth: user.dateOfBirth.getFormattedDate(),
    password: user.password.get(),
  };
}
