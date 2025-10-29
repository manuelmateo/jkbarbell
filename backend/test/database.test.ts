import { strict as assert } from "node:assert";
import { describe, test } from "mocha";
import { get_db_connection } from "../src/controllers/database";
import { TEST_DB } from "../src/types";

describe("db; trying to...", () => {
  beforeEach(async () => {
    const db_conn = await get_db_connection(TEST_DB);
    db_conn.data.exercises = [];
  });

  test("...sanity check", () => {
    assert.equal(1, 1);
  });

  test("...get connection to db", async () => {
    const db_conn = await get_db_connection(TEST_DB);
    assert.ok(db_conn);
  });

  test("...save an exercise", async () => {
    const db_conn = await get_db_connection(TEST_DB);
    assert.ok(db_conn);
    db_conn.data.exercises.push({ name: "Dumbell lat pulldown" });
  });

  test("...save and get an exercise", async () => {
    const db_conn = await get_db_connection(TEST_DB);
    assert.ok(db_conn);
    db_conn.data.exercises.push({ name: "Dumbell lat pulldown" });
    assert.equal(db_conn.data.exercises.length, 1);
  });
});
