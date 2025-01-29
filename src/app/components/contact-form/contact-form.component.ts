import { Component } from '@angular/core';
import { Contact } from './contact.interface';
import { ContactService } from '../../services/contact.service';

import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

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

  save(model: Contact, e : Event){
    e.preventDefault();
    console.log(model);
    this.contactService.sendMessage(model).subscribe(res=>{
      console.log(res);
      
    })

    emailjs
      .sendForm('service_li70tn6', 'template_997o6xn', e.target as HTMLFormElement, {
        publicKey: 'twow_OiDcodzo3LCz',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', (error as EmailJSResponseStatus).text);
        },
      );
  }
}
