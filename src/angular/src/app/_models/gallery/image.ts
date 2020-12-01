export class Image {
  public id: number;
  public name: string;
  public imageBytes: string;

  constructor( id, name, imageBytes ) {
    this.id = id;
    this.name = name;
    this.imageBytes = imageBytes
  }
}
