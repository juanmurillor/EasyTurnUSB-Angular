import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  @Input() email: string;
  @Input() password: string;

  constructor() {
    console.log('Este es el correo', this.email);
   }

  ngOnInit() {
  }

}
