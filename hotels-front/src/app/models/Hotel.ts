export class Hotel {
  public id?: string = null;
  public name?: string = null;
  public stars?: number = 1;
  public price?: number = 0;
  public image?: string = null;
  public amenities?: string[] = [];

  constructor(args?: Hotel) {
    if (args) {
      Object.keys(this).forEach(key => args[key] !== undefined ? this[key] = args[key] : null);
    }
  }
}
