export class Gallery {
  public id: number;
  public thumbnailImageUrl: string;
  public name: string;

  constructor(id, name, thumbnailImageUrl?) {
    this.id = id;
    this.thumbnailImageUrl = thumbnailImageUrl;
    this.name = name;
  }
}

