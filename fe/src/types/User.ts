export interface User {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phone?: string;
}
export function userFromJSON(maybe: any): User {
  if (!maybe) throw Error("object must exist");
  if (typeof maybe.email !== "string") throw Error("email must be string");
  if (typeof maybe.first_name !== "string")
    throw Error("firstname must be string");
  if (typeof maybe.last_name !== "string")
    throw Error("lastname must be string");
  if (typeof maybe.username !== "string")
    throw Error("username must be string");

  return {
    email: maybe.email,
    firstName: maybe.first_name,
    lastName: maybe.last_name,
    username: maybe.username,
    phone: maybe.phone,
  };
}

export function userToJSON(user: User) {
  return {
    email: user.email,
    first_name: user.firstName,
    last_name: user.lastName,
    username: user.username,
    phone: user.phone,
  };
}
