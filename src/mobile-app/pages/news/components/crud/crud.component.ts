import {Component, OnInit, AfterViewInit, OnDestroy} from '@angular/core';
import {CrudCreator, CrudModel, ComboItems, User} from './crud.model';
import {ConfigService} from '../../../../../services/config.service';
import {NewsService} from '../../../../../services/news/news.service';
import {UsersService} from 'src/services/users/users.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {Validators} from '@angular/forms';
import {ViewChild} from '@angular/core';
import {MessagesService} from '../../../../../services/messages/messages.service';
import {MatDialog} from '@angular/material';
import {MultiSelectComponent} from '../multi-select/multi-select.component';
import {Input} from '@angular/core';
import {ListComponent} from '../list/list.component';
import {SocketService} from 'src/services/socket/socket.service';
import {DashboardComponent} from '../../../dashboard/dashboard.component';
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'mobile-app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit, OnDestroy {
  @Input() crudModelData: CrudModel;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  userMission: any;
  public sourceNews: ComboItems;
  public urgentNews: ComboItems;
  public importantNews: ComboItems;
  subject;
  users;
  form;
  currentUserId;
  currentUserFullName;
  crudCreator: CrudCreator;
  crudModel: CrudModel;
  editorContent;
  value;
  composeForm;
  textEditorModule;

  // @ViewChild('subject') subjectt;

  constructor(public newsService: NewsService,
              private dashboard: DashboardComponent,
              public usersService: UsersService,
              private formBuilder: FormBuilder,
              private messagesService: MessagesService,
              private dialog: MatDialog,
              private socket: SocketService,
              private configService: ConfigService
  ) {
    this.textEditorModule = this.configService.textEditorModule;
    this.composeForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  private _filter(value: string): any {
    return this.crudCreator.sourceNews.filter(option => option.name.includes(value));
  }

  ngOnInit() {
    this.crudCreator = {} as CrudCreator;
    this.crudCreator.receivers = [] as User[];
    this.crudModel = {} as CrudModel;
    this.crudModel.sourceNews = {} as ComboItems;
    this.crudModel.importantNews = {} as ComboItems;
    this.crudModel.urgentNews = {} as ComboItems;
    this.crudModel.newsTruth = {} as ComboItems;
    this.crudModel.archiveNews = {} as ComboItems;
    // this.crudModel.userNews = [];
    this.getReceivers();
    this.getSourceNews();

    if (this.crudModelData)
      this.crudModel = this.crudModelData;
    let activeUserInfo = this.usersService.getUserInfo();
    this.currentUserId = activeUserInfo.id;
    this.currentUserFullName = activeUserInfo.firstname + activeUserInfo.lastname;
  }

  ngOnDestroy() {
    const myForm = this.crudModel;
    if (myForm.sourceNews.id != null ||
      myForm.userNews != null ||
      myForm.newsTruth.id != null ||
      myForm.urgentNews.id != null ||
      myForm.importantNews.id != null ||
      myForm.text != null
    )
      this.saveAsDraft();
  }

  private getReceivers() {
    this.crudCreator.receivers = this.newsService.getOfflineMailbox('newsReceiver');
    // this.newsService.getNewsRecivers().subscribe(
    //   (data) => {
    //     this.crudCreator.receivers = this.newsService.getOfflineMailbox('ReciversOfNews');
    //     // this.newsService.setMailbox(data, 'ReciversOfNews');
    //     this.crudCreator.receivers = data;
    //   },
    //   (error) => {
    //     this.crudCreator.receivers = this.newsService.getOfflineMailbox('ReciversOfNews');
    //     console.log(error);
    //   });
  }

  private openReceiversDialog() {

    const dialogRef = this.dialog.open(MultiSelectComponent, {
      data: this.crudCreator.receivers
    })
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          console.log('dataa', data)
          this.crudModel.userNews = [];
          data.forEach(element => {
            if (element.checked == true) {
              //this.comboItems.push(element);
              this.crudModel.userNews.push({
                receiver: element
              });
            }
          });
        }
      }
    );
  }

  private removeReceivers(u, userIndex) {
    this.crudCreator.receivers.forEach(element => {
      if (element.id == u.receiver.id)
        element['checked'] = false;
    });

    this.crudModel.userNews.splice(userIndex, 1);
  }

  private getSourceNews() {
    this.crudCreator.sourceNews = this.newsService.getOfflineSources('sourceNews');
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.crudCreator.urgentNews = this.newsService.getOfflineSources('urgentNews');
    this.crudCreator.importantNews = this.newsService.getOfflineSources('importantNews');
    this.crudCreator.newsTruth = this.newsService.getOfflineSources('truthNews');
    this.crudCreator.archiveNews = this.newsService.getOfflineSources('archiveNews');

  }

  public saveAsDraft() {
    this.crudModel.sender_time = Date.now();
    console.log(this.crudModel)
    this.newsService.saveDraft(this.crudModel);
    this.dashboard.showEventMessage("خبر در پیش نویس ها ذخیره شد")
  }

  private send() {
    // debugger
    +new Date
    //for getting userMission and append in to crudModel
    this.userMission = this.usersService.getMission();
    this.crudModel.mission = {"id": this.userMission.id};
    this.crudModel.sender_time = Date.now();
    let temp = this.crudModel.id;

    delete this.crudModel.id;

    this.crudModel.userNews.forEach(element => {
      delete element.receiver['authorities'];
    });

    if (this.crudModel.localAttachment)
      this.crudModel.attachment = this.crudModel.localAttachment.toString();
    this.newsService.putNews(this.crudModel).subscribe((data) => {
        this.socket.sendNews(this.crudModel.userNews, this.crudModel.subject, 'news', this.crudModel.importantNews.id);

        this.dashboard.showEventMessage("خبر با موفقیت ارسال شد")
        if (temp) {
          this.newsService.removeListRow(temp, 'draft');
        }
        this.newsService.addListRow(data, 'outbox');
        this.crudModel = {} as CrudModel;
        this.crudModel.sourceNews = {} as ComboItems;
        this.crudModel.importantNews = {} as ComboItems;
        this.crudModel.urgentNews = {} as ComboItems;
        this.crudModel.newsTruth = {} as ComboItems;
        this.crudModel.archiveNews = {} as ComboItems;
      },
      (error) => {
        this.dashboard.showEventMessage("خبر ارسال نشد و در پیش نویس ها ذخیره شد")
        this.saveAsDraft();
      });


  }

  fileChange(event) {
    //debugger;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      console.log('file.name', file.name);
      let headers = new Headers();
      this.messagesService.uploadFile(formData).subscribe(
        (res) => {
          if (!this.crudModel.localAttachment)
            this.crudModel.localAttachment = [];
          this.crudModel.localAttachment.push(res[0]);
        }
      );
    }
  }

  displayFn(opt?) {
    return opt ? opt.name : undefined;
  }

  initSourceNews(value) {
    this.crudModel.sourceNews.id = value.id;
  }

}
