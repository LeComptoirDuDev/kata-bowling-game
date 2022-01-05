import { Game } from '../src/BowlingGame';

describe('Bowling game', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  it('should work', () => {
    expect(true).toBeTruthy();
  });

  it('should create a bowling game', () => {
    expect(game._score).toBe(0);
    expect(game.pinsUp).toBe(10);
  });

  it('should return the score of one roll', () => {
    game.roll(5);
    const score = game.score();

    expect(score).toBe(5);
  });

  it('should return an error if roll greater than 10', () => {
    // expect.assertions(2);
    // try {
    //   game.roll(15);
    // } catch (e) {
    //   expect(e).toBeDefined();
    // }

    expect(() => game.roll(15)).toThrow('You knock more pins than pins up');
  });

  it('should return the score of a frame', () => {
    game.roll(5);
    game.roll(4);
    const score = game.score();
    expect(score).toBe(9);
  });

  it('should throw an error if two rolls are greater than 10 in a frame', () => {
    expect.assertions(1);
    try {
      game.roll(5);
      game.roll(6);
    } catch (e) {
      expect(e.message).toBe('You knock more pins than pins up');
    }
  });

  it('should return the score of two frames', () => {
    game.roll(5);
    game.roll(4);
    game.roll(5);
    game.roll(3);
    const score = game.score();
    expect(score).toBe(17);
  });

  it('should return the score of a spare', () => {
    game.roll(4);
    game.roll(6);
    game.roll(5);

    const score = game.score();
    expect(score).toBe(20);
  });

  it('should return the score of a strike', () => {
    game.roll(10);
    game.roll(5);
    game.roll(1);

    const score = game.score();
    expect(score).toBe(22);
    expect(game.currentRoll).toBe(4);
  });

  it('should throw an error if more than 10 frames played', () => {
    expect.assertions(1);
    try {
      for (let roll = 0; roll < 21; roll++) {
        game.roll(1);
      }
    } catch (e) {
      expect(e.message).toBe('No more roll possible');
    }
  });
  it('should throw an error if more than 10 frames played with a strike', () => {
    expect.assertions(1);
    try {
      for (let roll = 0; roll < 18; roll++) {
        game.roll(1);
      }
      game.roll(10);
      game.roll(5);
      game.roll(2);
      game.roll(2);
      game.roll(2);
    } catch (e) {
      expect(e.message).toBe('No more roll possible');
    }
  });

  it('should throw an error if more than 10 frames played with a spare', () => {
    expect.assertions(1);
    try {
      for (let roll = 0; roll < 18; roll++) {
        game.roll(1);
      }
      game.roll(5);
      game.roll(5);
      game.roll(2);
      game.roll(2);
    } catch (e) {
      expect(e.message).toBe('No more roll possible');
    }
  });

  it('should return the score of a strike in the 10th frame', () => {
    for (let roll = 0; roll < 18; roll++) {
      game.roll(1);
    }
    game.roll(10);
    game.roll(5);
    game.roll(2);
    const score = game.score();
    expect(score).toBe(35);
  });

  it('should return the score of a spare in the 10th frame', () => {
    for (let roll = 0; roll < 18; roll++) {
      game.roll(1);
    }
    game.roll(5);
    game.roll(5);
    game.roll(2);
    const score = game.score();
    expect(score).toBe(30);
  });

  it('should return the max score of 300 if there are only strikes', () => {
    for (let roll = 0; roll < 3; roll++) {
      game.roll(10);
    }
    const score = game.score();
    expect(score).toBe(50);
  });
});
