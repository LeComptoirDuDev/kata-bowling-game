export class Game {
  readonly NB_PINS = 10;
  readonly MAX_ROLLS = 20;
  readonly FRAME_ROLLS = 2;

  _score = 0;
  pinsUp = this.NB_PINS;
  currentRoll = 0;
  private spare = false;
  private strike = false;

  roll(pinsKnock: number): void {
    if (this.currentRoll >= this.MAX_ROLLS && !this.strike && !this.spare) {
      throw new Error('No more roll possible');
    }
    if (pinsKnock > this.pinsUp) {
      throw new Error('You knock more pins than pins up');
    }

    this.currentRoll++;

    this._score += pinsKnock;

    this.manageStrike(pinsKnock);

    if (!this.strike) {
      this.manageSpare(pinsKnock);
    }

    this.pinsUp = this.isFrameEnd() ? this.NB_PINS : this.pinsUp - pinsKnock;
  }

  private manageStrike(pinsKnock: number): void {
    this.applyStrike(pinsKnock);

    this.activeStrike(pinsKnock);
  }

  private applyStrike(pinsKnock: number): void {
    if (this.strike) {
      this._score += this.isLastFrame() ? 0 : pinsKnock;
      if (this.isFrameEnd()) {
        this.strike = false;
      }
    }
  }

  private isLastFrame(): boolean {
    return this.currentRoll >= this.MAX_ROLLS - this.FRAME_ROLLS;
  }

  private manageSpare(pinsKnock: number): void {
    if (this.spare) {
      this._score += this.isLastFrame() ? 0 : pinsKnock;
      this.spare = false;
    }

    if (this.pinsUp - pinsKnock === 0) {
      this.spare = true;
    }
  }

  private activeStrike(pinsKnock: number): void {
    if (pinsKnock === this.NB_PINS && !this.isFrameEnd()) {
      this.strike = true;
      this.currentRoll++;
    }
  }

  private isFrameEnd(): boolean {
    return this.currentRoll % this.FRAME_ROLLS === 0;
  }

  score(): number {
    return this._score;
  }
}
