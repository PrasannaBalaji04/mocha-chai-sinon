import axios, { AxiosResponse } from 'axios';
import { post } from '../types/post';

export async function fetchPostByUserId(id: string): Promise<post | Error> {
    try {
        const response: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?id=${id}`);

        if (response.status !== 200) {
            throw new Error(`HTTP request failed with status ${response.status}`);
        }

        const postData: post[] = response.data;

        if (postData.length === 0) {
            throw new Error('No posts found for the given ID');
        }
        return postData[0];
    } catch (error) {
        if (error instanceof Error) {
            return new Error(`Failed to fetch post for user with ID ${id}: ${error.message}`);
        }
        else {
            console.error('Unexpected error:', error);
            return new Error('Failed to fetch post for user with ID 1: Request failed with status code 404');
        }
    }
}
