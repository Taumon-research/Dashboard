import { Surreal } from 'surrealdb';
import { surrealdbNodeEngines } from '@surrealdb/node';

const db = new Surreal();

async function connect() {
  await db.connect('mem://', {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    engines: surrealdbNodeEngines(),
  });
}

connect();

export default db;
