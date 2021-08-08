import {Component, OnInit, OnChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../../../../services/users/users.service';
import {ReportsService} from '../../../../services/reports/reports.service';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {ConfigService} from '../../../../services/config.service';

@Component({
  selector: 'mobile-app-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.css']
})
export class NewFormComponent implements OnInit, OnChanges {
  nameOfReport: any;
  temp: {
    forms: any, value: any
  };

  formId: {
    id: any
  }
  form;
  inputId;
  inputIdd;
  textEditorModule;

  constructor(private route: ActivatedRoute,
              private dashboard: DashboardComponent,
              private userService: UsersService,
              private reportService: ReportsService,
              private configService: ConfigService
              // public mapService: FavaMap
  ) {
    this.textEditorModule = this.configService.textEditorModule;
  }

  ngOnChanges(): void {

  }

  ngOnInit() {

    // console.log('map',this.mapService.getMap())
    this.route.params.subscribe(
      (data) => {

        this.inputId = data
        this.form = this.reportService.getFormOrderById(data.inputId);
        // console.log('before',this.form)
        this.form.value = JSON.parse(this.form.value.replace(/'/g, "\""));
        this.addRequiredBadge(this.form.value)
        this.findNameOfReport();
        // console.log('after',this.form.value)

        //یه چک باکس به صورت استاتیک اضافه شده که برای تست استفاده شود
        // this.form.value.push({
        //   label:"checkbox",
        //   name:"checkbox-1532944907906",
        //   type:"checkbox",
        //   values:[
        //     {label: "Option 1", value: "option-1"},
        //     {label: "Option 2", value: "option-2"},
        //     {label: "Option 3", value: "option-3"}
        //   ]
        // })
      })
  }

  addRequiredBadge(form) {
    form.forEach(
      (field) => {
        if (field.required)
          field.label = field.label + ' * ';
      }
    )
  }

  reset() {
    this.form.value.forEach(element => {
      element.value = null;
    });
  }

  private findNameOfReport() {
    let mhd = this.userService.getFromLocalStorageGroupByUser('reportForms')

    for (let i = 0; i < mhd.length; i++) {

      if (mhd[i].id == this.inputId.inputId) {

        this.nameOfReport = mhd[i].name;

        console.log(mhd[i])
      }
    }
  }

  submit() {
    if (this.formIsValid()) {
      let mhd = JSON.stringify(this.form.value).replace(/"/g, "'")
      let id = {
        id: this.form.id
      }
      this.formId = id;
      2
      let sendReportTemp = {
        forms: this.formId, value: mhd
      }
      this.temp = sendReportTemp;
      this.reportService.putNews(this.temp).subscribe(
        (data) => {
          // debugger;
          this.reportService.addListRow(data, 'sentReportRowList', this.inputId);
          let mhd = this.userService.getFromLocalStorageGroupByUser("sentReportRowList");
          this.dashboard.showEventMessage("گزارش با موفقیت ارسال شد");

        }
      );
    } else {
      this.dashboard.showEventMessage("لطفا مقادیر ستاره دار را پر کنید.");
    }
  }

  formIsValid() {
    let valid = true;
    this.form.value.forEach(
      (field) => {
        if (field.required && field.value == null) {
          valid = false;
        }
      }
    )
    return valid;
  }

}
