import bcrypt from "bcrypt";

const round = 10;

export function hashString(string: string) {
  return bcrypt.hashSync(string, round);
}
