"use client";
// InitializedMDXEditor.tsx
import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  toolbarPlugin,
  BoldItalicUnderlineToggles,
  UndoRedo,
  type MDXEditorMethods,
  type MDXEditorProps,
  InsertImage,
  InsertTable,
  CreateLink,
  BlockTypeSelect,
  ListsToggle,
  tablePlugin,
  InsertThematicBreak,
  linkDialogPlugin,
  imagePlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

// Only import this to the next file
export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  async function imageUploadHandler(image: File) {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    console.log("Response status:", response.status); // Log the response status

    if (response.ok) {
      const { url } = await response.json();
      return url;
    } else {
      console.error("Error uploading image:", response.statusText); // Log any errors
      console.log("Failed to upload image");
    }
  }
  return (
    <MDXEditor
      className="prose"
      plugins={[
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <InsertImage />
              <InsertTable />
              <CreateLink />
              <BlockTypeSelect />
              <ListsToggle />
              <InsertThematicBreak />
            </>
          ),
        }),
        tablePlugin(),
        linkDialogPlugin(),
        imagePlugin({ imageUploadHandler }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
