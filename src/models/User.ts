
import Email from "./User/Email";
import Name from "./User/Name";

export interface User {
  name: Name;
  email: Email;
}

export type UserJson = Record<string, string>;

export function decode(body: UserJson): User {
  return {
    name: new Name(body.name),
    email: new Email(body.email),
  };
}

export function encode(user: User): UserJson {
  return {
    name: user.name.get(),
    email: user.email.get(),
  };
}
