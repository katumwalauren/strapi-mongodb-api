import Email from "./User/Email";
import Name from "./User/Name";
import DateOfBirth from "./User/DateOfBirth";
import Password from "./User/Password";
import ParseException from "../exceptions/ParseException";

export interface User {
  name: Name;
  email: Email;
  dateOfBirth: DateOfBirth;
  password: Password;
}

export type UserJson = Record<string, string>;

export function decode(body: UserJson): User {
  return {
    name: new Name(body.name),
    email: new Email(body.email),
    dateOfBirth: new DateOfBirth(new Date(body.dateOfBirth)),
    password: new Password(body.password),
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

