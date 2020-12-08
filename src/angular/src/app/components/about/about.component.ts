import { Component, OnInit } from '@angular/core';
import {Image} from "../../_models/gallery/image";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  images: Image[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
