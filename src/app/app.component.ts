import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      projectName: new FormControl(
        null,
        [Validators.required, this.forbiddenProjectName.bind(this)],
        this.asyncForbidenProjectName
      ),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl('stable'),
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    //this.signupForm.reset();
  }

  forbiddenProjectName(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return { projectNameForbidden: true };
    }
    return null;
  }

  asyncForbidenProjectName(
    control: FormControl
  ): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      if (control.value === 'TestProject') {
        resolve({ projectNameForbidden: true });
      } else {
        resolve(null);
      }
    });
  }
}
