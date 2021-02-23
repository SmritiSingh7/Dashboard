import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isTrue:boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  changetheme(){
      this.isTrue!= this.isTrue
  }
}
