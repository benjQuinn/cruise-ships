const Port = require('../src/port');
const Ship = require('../src/ship');

describe('constructor', () => {
    const portOne = new Port('Belfast');

    it('returns an object', () => {
        expect(new Port()).toBeInstanceOf(Object);
    });
    it('has a name property', () => {
        expect(portOne.name).toBe('Belfast');
    });
});