const Itinerary = require('../src/itinerary');
const Port = require('../src/port');

describe('Itinerary constructor', () => {
    const itinerary = new Itinerary();

    it('returns an object', () => {
        expect(itinerary).toBeInstanceOf(Object);
    });
    
    it('has a ports property', () => {
        const portOne = jest.fn();
        const portTwo = jest.fn();
        const itinerary = new Itinerary([portOne, portTwo]);

        expect(itinerary.ports).toEqual([portOne,portTwo]);
    });
});