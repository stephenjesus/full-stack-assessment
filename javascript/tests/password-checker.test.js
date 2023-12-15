const { strongPasswordChecker } = require('../password-checker');
const chai = require('chai');
const expect = chai.expect;

describe('Strong Password Checker', () => {
    it('should return the correct steps for a weak password', () => {
        expect(strongPasswordChecker("a")).to.equal(5);
    });

    it('should return the correct steps for a moderately strong password', () => {
        expect(strongPasswordChecker("aA1")).to.equal(3);
    });

    it('should return 0 for a strong password', () => {
        expect(strongPasswordChecker("1337C0d3")).to.equal(0);
    });
});
