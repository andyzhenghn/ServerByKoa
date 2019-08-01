const assert = require('assert');
const lib = require('./index');

describe('Math', () => {
    describe('#iterate', () => {
        it('should return 10', () => {
            assert.equal('10', lib.iterate(5, 5));
        });
        it('should return 0', () => {
            assert.equal('0', lib.iterate());
        });
        it('should return 10', () => {
            assert.equal('10', lib.iterate(1, 1));
        });
    });
});