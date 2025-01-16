import { Component } from '@angular/core';
import { Contact } from './contact.interface';

@Component({
  selector: 'app-contact-form',
  standalone: false,
  
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  contact!: Contact;

  ngOnInit(){
    this.contact = {
      name: '',
      email: '',
      message: '',
    }
  }

  save(model: Contact){
    console.log(model);
  }
}
