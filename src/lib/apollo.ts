import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'https://api-sa-east-1.graphcms.com/v2/cl560zg7s3o9401up97y55mnc/master',
    cache: new InMemoryCache(),
})