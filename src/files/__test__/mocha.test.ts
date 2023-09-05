import { expect } from 'chai';
import sinon from 'sinon';
import axios, { AxiosRequestConfig } from 'axios';
import { fetchPostByUserId } from '../mocha';

describe('fetchPostByUserId', () => {
    let axiosStub: sinon.SinonStub;

    beforeEach(() => {
        axiosStub = sinon.stub(axios, 'get');
    });
    afterEach(() => {
        axiosStub.restore();
    });
    it('should fetch a post by user ID successfully', async () => {
        axiosStub.resolves({ status: 200, data: [{ userId: '1', id: '1', title: 'Test Post', body: 'This is a test post' }] });

        const userId = '1';
        const result = await fetchPostByUserId(userId);

        expect(result).to.deep.equal({ userId: '1', id: '1', title: 'Test Post', body: 'This is a test post' });

    });

    it('should handle an HTTP request error', async () => {
        axiosStub.rejects({ response: { status: 404 } });

        const id = 'a';
        const result = await fetchPostByUserId(id);

        expect(result).to.be.an('error');
        if (result instanceof Error) {
            expect(result.message).to.equal('Failed to fetch post for user with ID 1: Request failed with status code 404');
        }

    });

    it('should handle no posts found for the given user ID', async () => {
        axiosStub.resolves({ status: 200, data: [] });

        const id = 'a';
        const result = await fetchPostByUserId(id);

        expect(result).to.be.an.instanceOf(Error);
        if (result instanceof Error) {
            expect(result.message).to.equal(`Failed to fetch post for user with ID ${id}: No posts found for the given ID`);
        }

    });
});
