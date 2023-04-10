import { useQuery } from 'react-query';
import { GraphQLClient, gql } from 'graphql-request';

// https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clg7p59sx1f9y01uieovfdnan/master
// https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clg7p59sx1f9y01uieovfdnan/master
const API_URL =
    'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clg7p59sx1f9y01uieovfdnan/master';

const graphQLClient = new GraphQLClient(API_URL);

type Post = {
    id: string;
    title: string;
    date: string;
};

/*

            author {
              name
            }
            content {
              text
            }
*/
export function useGetPosts() {
    return useQuery<Post[]>('get-posts', async () => {
        const { posts } = await graphQLClient.request(gql`
      query {
        posts {
            id
            title
            date
          }
      }
    `);
        return posts;
    });
}
