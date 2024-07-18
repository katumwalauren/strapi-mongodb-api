export default class ParseException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ParseException";

    
  }
}
