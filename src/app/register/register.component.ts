import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup , Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup
  constructor() {
    this.form=new FormGroup(
      {
        Email:new FormControl("",Validators.email),
        Passwd:new FormControl("",Validators.required),
        Cfpasswd:new FormControl("",Validators.required),
        dob:new FormControl(new Date().toISOString().slice(0,10))
      }
    );
   }

  ngOnInit(): void {
  }
  submit(){
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

}
