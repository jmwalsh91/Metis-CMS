import { sb } from '@/services/sb';
import { Grid } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import PostCard from '../PostCard';



function Posts() {
    const { data } = useQuery(["prefetchPosts"], sb.getAllPosts);
  return (
    <Grid>
    {data &&
        data.map((post) => {
            return (
                <Grid.Col span={4}>
              <PostCard
                title={post.post_title}
                description={post.post_text}
                isPreview={false}
                imageUrl={post.card_image}
                tags={post.tags}
                id={post.id}
                />
            </Grid.Col>
          );
        })}
        </Grid>
  )
}

export default Posts