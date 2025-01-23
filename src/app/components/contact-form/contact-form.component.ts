import { Component } from '@angular/core';
import { Contact } from './contact.interface';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: false,
  
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  contact!: Contact;

  constructor (private contactService: ContactService){}

  ngOnInit(){
    this.contact = {
      name: '',
      email: '',
      message: '',
    }
  }

  save(model: Contact){
    console.log(model);
    this.contactService.sendMessage(model).subscribe(res=>{
      console.log(res);
      
    })
  }
}
