import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import { fetchPostByUserId } from '../../src/files/mocha';

describe('fetchPostByUserId', () => {
    it('should fetch a post by user ID successfully', async () => {
        const axiosStub = sinon.stub(axios, 'get');
        axiosStub.resolves({ status: 200, data: [{ userId: '1', id: '1', title: 'Test Post', body: 'This is a test post' }] });

        const userId = '1';
        const result = await fetchPostByUserId(userId);

        expect(result).to.deep.equal({ userId: '1', id: '1', title: 'Test Post', body: 'This is a test post' });

        axiosStub.restore();
    });

    it('should handle an HTTP request error', async () => {
        const axiosStub = sinon.stub(axios, 'get');
        axiosStub.rejects({ response: { status: 404 } });

        const id = '1';
        const result = await fetchPostByUserId(id);

        expect(result).to.be.an('error');
        if (result instanceof Error) {
            expect(result.message).to.equal('Failed to fetch post for user with ID 1: Request failed with status code 404');
        }
        else {
            console.log(result);
            expect.fail("Recieved data while expecting Error!")
        }
        axiosStub.restore();
    });

    it('should handle no posts found for the given user ID', async () => {
        const axiosStub = sinon.stub(axios, 'get');
        axiosStub.resolves({ status: 200, data: [] });

        const id = 'a';
        const result = await fetchPostByUserId(id);

        expect(result).to.be.an.instanceOf(Error);
        if (result instanceof Error) {
            expect(result.message).to.equal(`Failed to fetch post for user with ID ${id}: No posts found for the given ID`);
        }
        else {
            console.log(result);
            expect.fail("Recieved data while expecting Error!");
        }
        axiosStub.restore();
    });
});
