import { Component, OnInit, Input, EventEmitter, Output, OnChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'mobile-app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.css']
})
export class DynamicFormFieldComponent implements OnInit, DoCheck {
  
  @Input() fields;
  @Output() fieldsChange = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  ngDoCheck(){
    this.fieldsChange.emit(this.fields);    
  }

}
