"use client";
import React, { useEffect, useState } from "react";
import data from "../../public/contents/contents.json";
import ReactMarkdown from "react-markdown";

const ReadPage = () => {
  const content = data;

  console.log(content);
  return (
    <div className="prose">
      {content.map((item, index) => (
        <ReactMarkdown key={index}>{item}</ReactMarkdown>
      ))}
    </div>
  );
};

export default ReadPage;
