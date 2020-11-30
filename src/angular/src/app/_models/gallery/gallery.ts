import {Injectable} from "@angular/core";
import {Image} from "./image";

export class Gallery {
  public id: number;
  public thumbnailBytes: string

  constructor(id, thumbnailBytes
  ) {
    this.id = id;
    this.thumbnailBytes = thumbnailBytes
  }
}

