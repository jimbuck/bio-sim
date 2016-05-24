
export interface IWorldOptions
{
  /**
   * The starting value for the random number generator.
   */
  seed?: number;
}

export class World
{
  public seed: number;
  
  constructor(options: IWorldOptions) {
      this.seed = options.seed || Date.now();
  }
}