import { Grid, Loader, Modal, ScrollArea } from "@mantine/core";
import React, { Suspense, useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { sb } from "../services/sb";
import type { Post, PostResolved, PostRejected } from "../services/sb";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";
import Posts from "@/components/view/Posts";

function View() {
  const [viewId, setViewId] = useState<number>(0);

  function handleView(postId: number) {
    setViewId(postId);
    //TODO: VIEW BLOGPOST
    postId === 0 ? null : null;
  }
  return (
    <>
      <ScrollArea style={{ height: "90vh" }}>
        <Suspense fallback={<Loader />}>
          <Posts />
        </Suspense>

        <Modal
          opened={viewId !== 0}
          onClose={function (): void {
            throw new Error("Function not implemented.");
          }}
        >
          {/*    <ViewPost  /> */}
        </Modal>
      </ScrollArea>
    </>
  );
}

export default View;
