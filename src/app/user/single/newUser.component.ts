import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../user.model';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Search } from '../../shared/shared.model'

@Component({
  selector: 'app-newUser',
  templateUrl: './newUser.component.html',
  styleUrls: ['../user.component.css'],
})

export class NewUserComponent implements OnInit {
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Input() search: Search = new Search();
  @Input() fetchedUser: User = new User();
  public myForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
  ) { }

  save() {
    this.saved.emit();
  }
    ngOnInit() {
      this.myForm = this._fb.group({
          name: ['', [Validators.required, Validators.minLength(3)]],
          lastName: ['', [Validators.required, Validators.minLength(3)]],
          phoneNumber: [''],
          fax: [''],
          title: [''],
          typeClient: [''],
      })
    }
}
