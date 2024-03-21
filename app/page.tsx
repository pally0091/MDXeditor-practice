"use client";
import dynamic from "next/dynamic";
import { Suspense, useRef } from "react";
import { ForwardRefEditor } from "./ForwardRedEditor";
import "@mdxeditor/editor/style.css";
import { MDXEditorMethods } from "@mdxeditor/editor";

const EditorComp = dynamic(() => import("./EditorComponent"), { ssr: false });

const markdown = `
  * Item 1
  * Item 2
  * Item 3
    * nested item

  1. Item 1
  2. Item 2
`;

export default function Home() {
  const editorRef = useRef<MDXEditorMethods | null>(null);
  const handleSave = async () => {
    try {
      const content = editorRef.current?.getMarkdown();
      const response = await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      if (response.ok) {
        console.log("Content saved successfully!");
        alert("Content saved successfully!");
      } else {
        console.error("Failed to save content:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  return (
    <>
      <br />
      <div style={{ border: "1px solid black" }}>
        <Suspense fallback={null}>
          <ForwardRefEditor
            markdown={markdown}
            ref={editorRef}
          />
          <button onClick={handleSave}>Save</button>
        </Suspense>
      </div>
    </>
  );
}
