const Ship = require('../src/ship');

let portOne;
let portTwo;
let itinerary;
let ship;

beforeEach(() => {
    portOne = { 
        name: 'Liverpool', 
        ships: [], 
        addShip: jest.fn(), 
        removeShip: jest.fn()
    };
    portTwo = { 
        name: 'Dublin', 
        ships: [], 
        addShip: jest.fn(), 
        removeShip: jest.fn()
    };
    itinerary = {
        ports: [portOne, portTwo]
    }
    ship = new Ship(itinerary);
});

describe('Ship constructor', () => {

    it('returns an object', () => {
        expect(ship).toBeInstanceOf(Object);
    });

    it('has a starting port', () => {
        expect(ship.currentPort).toBe(portOne);
    });

    it('has a previous port property', () => {
        expect(ship.previousPort).toBe(null)
    });

    it('gets added to port on instantiation', () => {
        expect(portOne.addShip).toHaveBeenCalledWith(ship);
    })
});

describe('leavePort', () => {
    it('can set sail', () => {
        ship.leavePort();

        expect(ship.currentPort).toBeFalsy();
        expect(portOne.removeShip).toHaveBeenCalledWith(ship);
    });

    it('changes ships previous port', () => {
        ship.leavePort();
        
        expect(ship.previousPort).toBe(portOne);
    });
});

describe('dock', () => {
    it('can dock at another port', () => {
        ship.leavePort();
        ship.dock();

        expect(ship.currentPort).toBe(portTwo);
        expect(portTwo.addShip).toHaveBeenCalledWith(ship);
    });

    it('can\'t sail further than its itinerary', () => {
        ship.leavePort();
        ship.dock();

        expect(() => ship.leavePort()).toThrowError('End of itinerary reached');
    });
});
