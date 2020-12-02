export class Gallery {
  public id: number;
  public thumbnailImageName: string;
  public name: string;

  constructor(id, name, thumbnailImageName?) {
    this.id = id;
    this.thumbnailImageName = thumbnailImageName;
    this.name = name;
  }
}

