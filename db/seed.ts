import { db, Messages } from "astro:db";

export default async function () {
  await db
    .insert(Messages)
    .values([
      {
        id: 1,
        name: "test name",
        email: "test@test.com",
        content: "Hope you like Astro DB!",
      },
    ]);
}
