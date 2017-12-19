import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Search } from '../../../shared/shared.model'

@Component({
  selector: 'app-settings-user',
  templateUrl: './settingsUser.component.html',
  styleUrls: ['../../user.component.css'],
})

export class SettingsUserComponent implements OnInit {
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
      email: [''],
    })
  }
}
