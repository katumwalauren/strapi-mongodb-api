import ParseException from "../exceptions/ParseException";

type NonNullableUnknown = NonNullable<unknown>;

export type Json = Record<string, unknown>;

type ParsedJson = Record<string, NonNullableUnknown>;

export function parseJson(json: Json, expectedKeys: string[]): ParsedJson {

  const jsonKeys = Object.keys(json)

  const missingKeys = expectedKeys.filter(key => !jsonKeys.includes(key))
  const extraKeys = jsonKeys.filter(key => !expectedKeys.includes(key))

  if (missingKeys.length) {
    throw new ParseException("Json has missing keys: " + missingKeys.join(", "))
  }

  if (extraKeys.length) {
    throw new ParseException("Json has unexpected keys: " + extraKeys.join(", "))
  }

  Object.keys(json).forEach(key => {
    if (json[key] === null) {
      throw createParseException(key, "null")
    }

    if (json[key] === undefined) {
      throw createParseException(key, "undefined")
    }
  });

  return json as ParsedJson;
}

const createParseException = (key: string, label: string) => new ParseException(`${key} should not be ${label}`)
