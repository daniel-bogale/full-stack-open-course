const { test, describe } = require("node:test");
const assert = require("node:assert");
const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require("../utils/list_helper");

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

describe("favorite book", () => {
  test("of empty list is empty object", () => {
    assert.deepStrictEqual(favoriteBlog([]), {});
  });
  test("of list that has only one blog is that one blog", () => {
    const theBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
    };
    assert.deepStrictEqual(favoriteBlog([theBlog]), theBlog);
  });
  test("of a bigger list which has a unique favorite blog is the top liked blog", () => {
    const theBlog = {
      title: "Considered Harmful",
      author: "W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 15,
    };
    assert.deepStrictEqual(
      favoriteBlog([
        {
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
          likes: 6,
        },
        theBlog,
        {
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
          likes: 6,
        },
      ]),
      theBlog
    );
  });

  test("of a bigger list is one among the most liked blogs", () => {
    const blogs = [
      {
        title: "Considered Harmful",
        author: "Ed Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 15,
      },
      {
        title: "Harmful",
        author: "Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 15,
      },
      {
        title: " Considered Harmful",
        author: "Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 4,
      },
    ];

    const maxLike = Math.max(...blogs.map((b) => b.likes));

    const maxLikedBlogs = blogs.filter((blog) => blog.likes === maxLike);
    const result = favoriteBlog(blogs);

    assert.ok(
      maxLikedBlogs.some(
        (blog) => JSON.stringify(blog) === JSON.stringify(result)
      )
    );
  });
});

describe("top bloger", () => {
  test("of empty list is empty object", () => {
    assert.deepStrictEqual(mostBlogs([]), {});
  });
  test("of list that has only one blog is that one blog author", () => {
    const theBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
    };
    assert.deepStrictEqual(mostBlogs([theBlog]), {
      author: theBlog.author,
      blogs: 1,
    });
  });
  test("of a bigger list computed correctly", () => {
    const blogs = [
      {
        title: "Considered Harmful",
        author: "Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 15,
      },
      {
        title: "Harmful",
        author: "Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 15,
      },
      {
        title: " Considered Harmful",
        author: "Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 4,
      },

      {
        title: " Considered Harmful",
        author: "Dijkstra2",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 4,
      },
      {
        title: " Considered Harmful",
        author: "Dijkstra2",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 4,
      },
      {
        title: " Considered Harmful",
        author: "Dijkstra2",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 4,
      },
    ];
    const possibleBlogs = [
      { author: "Dijkstra2", blogs: 3 },
      { author: "Dijkstra", blogs: 3 },
    ];
    const result = mostBlogs(blogs);

    assert.ok(
      possibleBlogs.some(
        (blog) => JSON.stringify(blog) === JSON.stringify(result)
      )
    );
  });
});
describe("top Liked Author", () => {
  test("of empty list is empty object", () => {
    assert.deepStrictEqual(mostLikes([]), {});
  });
  test("of list that has only one blog is that one blog author", () => {
    const theBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
    };
    assert.deepStrictEqual(mostLikes([theBlog]), {
      author: theBlog.author,
      likes: 5,
    });
  });
  test("of a bigger list computed correctly", () => {
    const blogs = [
      {
        title: "Considered Harmful",
        author: "Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 15,
      },
      {
        title: "Harmful",
        author: "Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 15,
      },
      {
        title: " Considered Harmful",
        author: "Dijkstra",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 4,
      },

      {
        title: " Considered Harmful",
        author: "Dijkstra2",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 15,
      },
      {
        title: " Considered Harmful",
        author: "Dijkstra2",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 15,
      },
      {
        title: " Considered Harmful",
        author: "Dijkstra2",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        likes: 4,
      },
    ];
    const possibleBlogs = [
      { author: "Dijkstra2", likes: 34 },
      { author: "Dijkstra", likes: 34 },
    ];
    const result = mostLikes(blogs);

    assert.ok(
      possibleBlogs.some(
        (blog) => JSON.stringify(blog) === JSON.stringify(result)
      )
    );
  });
});
