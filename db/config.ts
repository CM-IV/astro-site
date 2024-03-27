import { defineDb, defineTable, column, NOW } from "astro:db";

const Messages = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    email: column.text(),
    content: column.text(),
    date: column.date({ default: NOW, optional: true }),
  },
});

export default defineDb({
  tables: { Messages },
});
