import "./App.css";
import Post from "./Post";

function App() {
  const posts = [
    {
      id: 1,
      title: "Best and easy GUI for rust in 2023?",
      author: "tidersky",
      content:
        "Hello guys! , So I am new to rust and I am loving it a lot , I plan to use rust for CLI tool and building GUI , So i picked up a GUI library called egui but then I shifted to gtk-rs then again went back too egui. I find egui visually appealing but its unnecessarily complicated , So I wanted you guys suggestions for some GUI library which is easy to get startedThanks :)",
      upvotes: 4,
      timestamp: "2024-09-27 18:00:00.000",
      comments: [
        {
          id: 1,
          author: "klorophane",
          content:
            "Hello guys! , So I am new to rust and I am loving it a lot , I plan to use rust fo",
          upvotes: 0,
          timestamp: "2024-09-27 18:00:00.000",
          replies: [
            {
              id: 1,
              author: "rantenki",
              content: "Hello, world!",
              upvotes: 0,
              timestamp: "2024-09-27 18:00:00.000",
            },
            {
              id: 2,
              author: "squidmedussa",
              content: "Hello, world!",
              upvotes: 0,
              timestamp: "2024-09-27 18:00:00.000",
              replies: [
                {
                  id: 1,
                  author: "TheBlackCat22527",
                  content: "Hello, world!",
                  upvotes: 0,
                  timestamp: "2024-09-27 18:00:00.000",
                },
                {
                  id: 2,
                  author: "orfeo34",
                  content: "Hello, world!",
                  upvotes: 0,
                  timestamp: "2024-09-27 18:00:00.000",
                  replies: [
                    {
                      id: 1,
                      author: "cornmonger",
                      content: "Hello, world!",
                      upvotes: 0,
                      timestamp: "2024-09-27 18:00:00.000",
                    },
                    {
                      id: 2,
                      author: "me",
                      content: "Hello, world!",
                      upvotes: 0,
                      timestamp: "2024-09-27 18:00:00.000",
                    },
                    {
                      id: 3,
                      author: "me",
                      content: "Hello, world!",
                      upvotes: 0,
                      timestamp: "2024-09-27 18:00:00.000",
                    },
                  ],
                },
                {
                  id: 3,
                  author: "me",
                  content: "Hello, world!",
                  upvotes: 0,
                  timestamp: "2024-09-27 18:00:00.000",
                },
              ],
            },
            {
              id: 3,
              author: "me",
              content: "Hello, world!",
              upvotes: 0,
              timestamp: "2024-09-27 18:00:00.000",
            },
          ],
        },
        {
          id: 2,
          author: "tukanoid",
          content: "Hello, world!",
          upvotes: 0,
          timestamp: "2024-09-27 18:00:00.000",
        },
        {
          id: 3,
          author: "temeddix",
          content: "Hello, world!",
          upvotes: 0,
          timestamp: "2024-09-27 18:00:00.000",
          replies: [
            {
              id: 1,
              author: "pachiburke",
              content: "Hello, world!",
              upvotes: 0,
              timestamp: "2024-09-27 18:00:00.000",
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <div className="mt-20">
        <Post post={posts[0]} />
      </div>
    </>
  );
}

export default App;
