import { faker } from '@faker-js/faker';

export type ContactFormData = {
  fullName: string;
  phoneNumber: string;
  email: string;
  message: string;
};

export function makeContactFormData(): ContactFormData {
  const ts = Date.now();
  return {
    fullName: faker.person.fullName(),
    phoneNumber: `08${faker.string.numeric(10)}`,
    email: `playwright.${ts}.${faker.string.alphanumeric(6).toLowerCase()}@example.com`,
    message: `Automated message ${ts} - ${faker.lorem.sentence()}`
  };
}

