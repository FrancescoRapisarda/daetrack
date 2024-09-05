import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CountdownComponent } from '../countdown/countdown.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [TranslateModule, CountdownComponent, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  formEmpty: boolean = true;

  userRegisterObj: any = {
    Name: '',
    Surname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    privacy: false
  };

  constructor(private translate: TranslateService) {}

  router = inject(Router);

  changeLang(lang: string): void {
    this.translate.use(lang);
  }

  onRegister(): void {
    console.log('Test registrazione', this.userRegisterObj);
    
    if (!this.isFormFilled()) {
      alert('Tutti i campi devono essere compilati.');
    } else if (!this.arePasswordsMatching()) {
      alert('Le password non coincidono.');
    } else {
      const isLocalData = localStorage.getItem('angular18Local');
      if (isLocalData != null) {
        const localArray = JSON.parse(isLocalData);
        localArray.push(this.userRegisterObj);
        localStorage.setItem('angular18Local', JSON.stringify(localArray));
      } else {
        const localArray = [];
        localArray.push(this.userRegisterObj);
        localStorage.setItem('angular18Local', JSON.stringify(localArray));
      }
      this.formEmpty = false;
    }
  }

  isFormFilled(): boolean {
    return this.userRegisterObj.Name !== '' &&
           this.userRegisterObj.Surname !== '' &&
           this.userRegisterObj.phone !== '' &&
           this.userRegisterObj.email !== '' &&
           this.userRegisterObj.password !== '' &&
           this.userRegisterObj.confirmPassword !== '' &&
           this.userRegisterObj.privacy;
  }

  arePasswordsMatching(): boolean {
    return this.userRegisterObj.password === this.userRegisterObj.confirmPassword;
  }

  onTimerFinished(): void {
    this.formEmpty = true;
    alert("Tempo per l'inserimento dell'OTP scaduto");
  }

moveFocus(event: any, nextInputIndex: number) {
  const input = event.target;
  const value = input.value;

  if (value && nextInputIndex <= 5) {
    const nextInput = document.querySelectorAll('.otp-input-container input')[nextInputIndex] as HTMLInputElement;
    if (nextInput) {
      nextInput.focus();
    }
  }
}

validatePhone(): void {
  const phonePattern = /^\+?[0-9]*$/; /* ^inizio stringa, $fine stringa , \+? è facoltativo il simbolo + */
  if (!phonePattern.test(this.userRegisterObj.phone)) {
    this.userRegisterObj.phone = '';
    alert('Il numero di telefono può contenere solo numeri e un eventuale segno + all\'inizio.');
  }
}

}
