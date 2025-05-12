export const testPosts = [
  {
    id: "test123",
    title: "Best and easy GUI for rust in 2023?",
    author: "tidersky",
    content:
      "Hello guys! , So I am new to rust and I am loving it a lot , I plan to use rust for CLI tool and building GUI , So i picked up a GUI library called egui but then I shifted to gtk-rs then again went back too egui. I find egui visually appealing but its unnecessarily complicated , So I wanted you guys suggestions for some GUI library which is easy to get startedThanks :)",
    authorId: "testId",
    likeCount: 4,
    commentCount: 4,
    createdAt: "2024-09-27 18:00:00.000",
    updatedAt: "2024-09-27 18:00:00.000",
  },
];

export const testUsers = [
  {
    id: "test123",
    username: "tidersky",
    email: "tidersky@email.com",
    password: "tidersky",
    createdAt: "2024-09-27 18:00:00.000",
    updatedAt: "2024-09-27 18:00:00.000",
  },
];

export const comments = [
  {
    id: "test1234",
    authorId: "klorophane",
    parentId: "klorophane12",
    postId: "klorophane123123",
    content:
      "Hello guys! , So I am new to rust and I am loving it a lot , I plan to use rust fo",
    likeCount: 0,
    replyCount: 0,
    createdAt: "2024-09-27 18:00:00.000",
    updatedAt: "2024-09-27 18:00:00.000",
    replies: [
      {
        id: "test123432",
        authorId: "klorophane",
        parentId: "klorophane12",
        postId: "klorophane123123",
        content:
          "Hello guys! , So I am new to rust and I am loving it a lot , I plan to use rust fo",
        likeCount: 0,
        replyCount: 0,
        createdAt: "2024-09-27 18:00:00.000",
        updatedAt: "2024-09-27 18:00:00.000",
      },
      {
        id: "test12343234",
        authorId: "klorophane",
        parentId: "klorophane12",
        postId: "klorophane123123",
        content:
          "Hello guys! , So I am new to rust and I am loving it a lot , I plan to use rust fo",
        likeCount: 0,
        replyCount: 0,
        createdAt: "2024-09-27 18:00:00.000",
        updatedAt: "2024-09-27 18:00:00.000",
        replies: [
          {
            id: "423werwerdasdad",
            authorId: "klorophane",
            parentId: "klorophane12",
            postId: "klorophane123123",
            content:
              "Hello guys! , So I am new to rust and I am loving it a lot , I plan to use rust fo",
            likeCount: 0,
            replyCount: 0,
            createdAt: "2024-09-27 18:00:00.000",
            updatedAt: "2024-09-27 18:00:00.000",
          },
          {
            id: "wrwfsfasdasdasdasd",
            authorId: "klorophane",
            parentId: "klorophane12",
            postId: "klorophane123123",
            content:
              "Hello guys! , So I am new to rust and I am loving it a lot , I plan to use rust fo",
            likeCount: 0,
            replyCount: 0,
            createdAt: "2024-09-27 18:00:00.000",
            updatedAt: "2024-09-27 18:00:00.000",
            replies: [
              {
                id: "asfasfasfasfasfsa",
                authorId: "klorophane",
                parentId: "klorophane12",
                postId: "klorophane123123",
                content:
                  "Hello guys! , So I am new to rust and I am loving it a lot , I plan to use rust fo",
                likeCount: 0,
                replyCount: 0,
                createdAt: "2024-09-27 18:00:00.000",
                updatedAt: "2024-09-27 18:00:00.000",
              },
              {
                id: "test1rwerwer234",
                authorId: "klorophane",
                parentId: "klorophane12",
                postId: "klorophane123123",
                content:
                  "Hello guys! , So I am new to rust and I am loving it a lot , I plan to use rust fo",
                likeCount: 0,
                replyCount: 0,
                createdAt: "2024-09-27 18:00:00.000",
                updatedAt: "2024-09-27 18:00:00.000",
              }
            ],
          }
        ],
      },
    ],
  },
  {
    id: 2,
    author: "tukanoid",
    content: "Hello, world!",
    upvotes: 0,
    timestamp: "2024-09-27 18:00:00.000",
  }
]
