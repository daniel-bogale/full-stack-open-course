const { test, describe } = require("node:test");
const assert = require("node:assert");
const { dummy, totalLikes } = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    assert.strictEqual(totalLikes([]), 0);
  });
  test("when list has only one blogs equals the likes of that", () => {
    assert.strictEqual(
      totalLikes([
        {
          title: "2 Full Stack Open 2024",
          author: "2 daniel bogale",
          url: "https://fullstackopen.com/en/",
          likes: 5,
        },
      ]),
      5
    );
  });
  test("of a bigger list is calculated right", () => {
    assert.strictEqual(
      totalLikes([
        {
          title: "2 Full Stack Open 2024",
          author: "2 daniel bogale",
          url: "https://fullstackopen.com/en/",
          likes: 5,
        },
        {
          title: "2 Full Stack Open 2024",
          author: "2 daniel bogale",
          url: "https://fullstackopen.com/en/",
          likes: 7,
        },
      ]),
      12
    );
  });
});
