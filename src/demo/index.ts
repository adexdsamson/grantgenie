import { User } from "@/types";
import { faker } from "@faker-js/faker";

export const makeArrayData = <T = unknown>(func: () => T) =>
  faker.helpers.multiple(func, { count: 10 });

export const getDemoUser = (): User => {
  return {
    first_name: faker.person.firstName(),
    id: faker.string.uuid(),
    last_name: faker.person.lastName()
  }
}

export const getDemoToken = () => faker.string.nanoid()