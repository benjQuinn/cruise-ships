const Ship = require('../src/index');

describe('constructor', () => {
    const ship = new Ship('Liverpool');
    
    it('returns an object', () => {
        expect(new Ship()).toBeInstanceOf(Object);
    });
    it('has a starting port', () => {
        expect(ship.startingPort).toBe('Liverpool')
    });
});

