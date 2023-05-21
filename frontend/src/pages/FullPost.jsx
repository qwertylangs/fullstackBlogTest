import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("iddle");

  const { id } = useParams();

  useEffect(() => {
    if (status === "iddle") {
      setStatus("loading");
      axios
        .get(`/posts/${id}`)
        .then((res) => {
          setData(res.data);
          setStatus("received");
        })
        .catch((err) => {
          console.wern(err);
          alert("не удалось получить статью");
          setStatus("error");
        });
    }
  }, []);

  if (status === "loading" || status === "iddle") {
    return <Post isLoading isFullPost />;
  }

  if (status === "error") {
    return <h2>Error</h2>;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? "http://localhost:4444" + data.imageUrl : ""}
        user={data.user}
        createdAt={"12 июня 2022 г."}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown>{data.text}</ReactMarkdown>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
