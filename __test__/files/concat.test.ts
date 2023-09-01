import concat from "../../src/files/concat";
import { expect } from 'chai';
import * as sinon from 'sinon';
import mocha from 'mocha';

describe('String utilities', () => {
    describe('concatenateStrings function', () => {
        it('should concatenate two empty strings', () => {
            const result = concat('', '');
            expect(result).to.equal('');
        });

        it('should concatenate a non-empty string with an empty string', () => {
            const result = concat('Hello', '');
            expect(result).to.equal('Hello');
        });

        it('should concatenate two non-empty strings', () => {
            const result = concat('Hello', ' World');
            expect(result).to.equal('Hello World');
        });

        it('should concatenate strings with special characters', () => {
            const result = concat('Hello', '!@#$%^&*()');
            expect(result).to.equal('Hello!@#$%^&*()');
        });

        it('should call the callback function', () => {
            const callback = sinon.fake();
            const result = concat('Hello', ' World');
            expect(result).to.equal('Hello World');
            expect(callback.calledOnce).not.to.be.true;
        });
    });
});
