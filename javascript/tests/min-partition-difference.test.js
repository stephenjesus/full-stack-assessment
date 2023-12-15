const { minimumDifference } = require('../min-partition-difference/index');
const chai = require('chai');
const expect = chai.expect;
describe('minimumDifference', () => {
    it('should return 72 for this partition list [-36, 36]', () => {
        expect(minimumDifference([-36, 36])).to.equal(72);
    });

    it('should return 2 for this partition list [3, 9, 7, 3]', () => {
        expect(minimumDifference([3, 9, 7, 3])).to.equal(2);
    });

    it('should return 0 for this partition list [2, -1, 0, 4, -2, -9]', () => {
        expect(minimumDifference([2, -1, 0, 4, -2, -9])).to.equal(0);
    });

});
