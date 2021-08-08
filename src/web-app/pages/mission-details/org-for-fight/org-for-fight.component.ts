import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MissionService} from '../../../services/mission/mission.service';
import {IActionMapping, TREE_ACTIONS, TreeComponent, TreeModel} from 'angular-tree-component';
import {HttpClient} from "@angular/common/http";
import {DataService} from "../../../services/data/data.service";
import {FormBuilder, Validators} from "@angular/forms";
import { ReportsService } from 'src/web-app/services/reports/reports.service';

const actionMapping: IActionMapping = {
  mouse: {
    dblClick: TREE_ACTIONS.TOGGLE_EXPANDED,
    // click: TREE_ACTIONS.TOGGLE_EXPANDED,
  }
}

interface Position extends ArrayBuffer {
  user: {
    username: string;
  };
}

@Component({
  selector: 'app-mission-tree',
  templateUrl: './org-for-fight.component.html',
  styleUrls: ['./org-for-fight.component.css']
})
export class MissionTreeComponent implements OnInit {
  public setUserForm;
  public activatedNode;
  public activatedNodeText = 'انتخاب نشده';
  public setUserResult;
  public orgForFightUsers;
  public id;
  public orgForFight;
  public type;
  public size;
  public options = {
    rtl: true,
    isExpandedField: 'expanded',
    animateExpand: true,
    animateSpeed: 30,
    animateAcceleration: 1.2,
    useVirtualScroll: true,
    actionMapping
  }

  public missionUsers;
  public setUserToOrg = {
    "type": "commander",
    "user": {
      "id": null
    },
    "orgForFight": {
      "class": "unit",
      "id": null
    }
  };

  @ViewChild('tree') treeComponent: TreeComponent;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private missionService: MissionService,
              private dataService: DataService,
              private reportsService: ReportsService,
              private fb: FormBuilder) {
    this.setUserForm = fb.group({
      username: ['', [Validators.required]],
    });
  }

  onEvent($event) {
    console.log($event);
  }

  private initOrgForFight() {
    this.missionService.getOrgForFight(this.id).subscribe(
      (data) => {
        if (data) {
          this.orgForFight = [data];
          // console.log(this.orgForFight)
          this.initText(this.orgForFight);
        }
      }
    );
  }

  private initText(data) {
    data.forEach(record => {
      console.log(record);
      let text = '';
      this.size.forEach(size => {
        if (size.name === record.unit.size) {
          text += size.translate + ' ';
        }
      })
      this.type.forEach(type => {
        if (type.name === record.unit.type) {
          text += type.translate + ' ';
        }
      })
      record.unit.text = text;
      if (record.children.length > 0) {
        this.initText(record.children);
      }
    });
  }

  public initOrgForFightNode(e) {
    this.activatedNode = e.node;
    this.activatedNodeText = e.node.data.unit.name;
    this.initOrgForFightNodeUser(this.activatedNode.data.id);
  }

  public getUsersByMissionId() {
    this.reportsService.getUsersByMissionId(this.id).subscribe(
      (data) => {
        this.missionUsers = data['records'];
      }
    )
  }

  public removeOrgForFightUser(){
    this.missionService.removeOrgForFightUser(this.orgForFightUsers[0].id).subscribe(
      (data) => {
        this.orgForFightUsers = null;
      }
    )
  }

  public setOrgForFightUser() {
    if (this.setUserForm.status && this.activatedNode) {
      let node = this.activatedNode.data;

      this.setUserToOrg.orgForFight.id = node.id;

      this.missionService
        .setOrgForFightUser(this.setUserToOrg).subscribe(
        () => {
          this.setUserResult =
            ` کاربر: ` +
           
            this.setUserToOrg.user['firstname'] + ' ' + this.setUserToOrg.user['lastname'] +
            
            ' به گره با نام: ' +
            node.unit.name +
            ' انتساب داده شد.';
          this.initOrgForFightNodeUser(node.id);
        },
        (e) => {
          this.setUserResult =
            ` کاربر: ` +
            this.setUserToOrg.user['firstname'] + ' ' + this.setUserToOrg.user['lastname'] +
            ' قبلا ' +
            ' انتساب داده شده است.';
          console.log('خطا');
        }
      );
    }
  }

  private initOrgForFightNodeUser(orgForFightId) {
    this.missionService.getOrgForFightUser(orgForFightId)
      .subscribe(
        (data: Position) => {
          this.orgForFightUsers = [data];
          console.log(this.orgForFightUsers);
        },
        () => {
          this.orgForFightUsers = null;
          // this.orgForFightUser = "کاربری انتساب داده نشده";
          console.log('"کاربری انتساب داده نشده"');
        }
      );
  }

  public expandTree() {
    const treeModel: TreeModel = this.treeComponent.treeModel;
    treeModel.expandAll();
  }

  public collapseTree() {
    const treeModel: TreeModel = this.treeComponent.treeModel;
    treeModel.collapseAll();
  }

  ngOnInit() {
    this.id = this.route.parent.snapshot.paramMap.get('id');
    this.getUsersByMissionId();
    
    this.dataService.getType().subscribe(
      (type) => {
        this.type = type;
        this.dataService.getSize().subscribe(
          (size) => {
            this.size = size;
            this.initOrgForFight();
          }, err => {
            console.log('خطا');
          }
        );
      }, err => {
        console.log('خطا');
      }
    );
  }
}
