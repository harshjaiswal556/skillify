import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './store/reducer/auth.reducer';
import { verifyUser } from './store/action/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'skillify';

  constructor(private store : Store<{auth : AuthState}>){}

  ngOnInit(): void {
      this.store.dispatch(verifyUser());
    
  }
}
