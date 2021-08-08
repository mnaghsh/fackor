import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ViewChild } from '@angular/core';
import { UsersService } from "../../services/users/users.service";
import { MatDialog } from "@angular/material";
import { MissionService } from "../../services/mission/mission.service";
import { SocketService } from "../../services/socket/socket.service";
import { ActivitiesService } from "../../services/activities/activities.service";
import OlXYZ from 'ol/source/xyz';
import Map from "ol/map";
import OlTileLayer from 'ol/layer/tile';
import OlView from 'ol/view';
import OlProj from 'ol/proj';
import { saveAs } from 'file-saver/FileSaver';
import { AuthInterceptor } from '../../services/auth-interceptor.service';
import { AndroidAPI } from 'resource/android';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  layer
  view: any;
  map: any;
  webSocket;
  activeUserInfo: any
  message;
  loginForm;
  hasMission;
  currentUser;

  @ViewChild('username') username;
  @ViewChild('password') password;

  constructor(private fb: FormBuilder,
    private myRoute: Router,
    private usersService: UsersService,
    public missionService: MissionService,
    private auth: AuthService,
    private authInterceptor: AuthInterceptor,
    private user: UsersService,
    private androidAPI: AndroidAPI,
    private socket: SocketService,
    public dialog: MatDialog,
    public activity: ActivitiesService) {

    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.socket.autoSender = false;

    const sourceOne = new OlXYZ({ 
      url: 'http://192.168.3.10:8080/LayerServer-1.0.0/tile/raster/' + 'land?x={x}&y={y}&z={z}'
    });
    const layer = new OlTileLayer({
      source: sourceOne
    });
    const view = new OlView({
      center: [6.661594, 50.433237],
      zoom: 3,
      minZoom: 2,
      maxZoom: 20
    });

    const map = new Map({
      target: 'map',
      layers: [layer],
      view: view
    });
    this.activeUserInfo = this.usersService.getUserInfo();
  }

  public login() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value.username,
        this.loginForm.value.password).subscribe(
          (res) => {
            this.authInterceptor.setAuthToken(res);
            this.successfulLogin();
          },
          (error) => {
            console.log('error', error)
            this.unSuccessfulLogin(error);
          }
        );
    } else {
      this.message = 'لطفا مقادیر بالا را به صورت صحیح وارد کنید.';
    }
  }

  public successfulLogin() {

    this.auth.setLoginEntryItems(this.loginForm.value);
    this.auth.setActiveUser(this.loginForm.value.username);
    this.user.setInfo(this.loginForm.value.username);
    this.user.localStorageSet.subscribe(
      () => {
        let userId = this.user.getUserInfo().id;
        let missionId = this.user.getMission().id;
        let accessToken = this.authInterceptor.getCookie('access_token');
        let expiresIn = this.authInterceptor.getCookie('expires_in');
        this.androidAPI.jsInterfaceSetToken(accessToken, expiresIn, userId, missionId);

        if (!this.socket.autoSender)
          this.myRoute.navigate(['']);
      }
    );

  }

  public unSuccessfulLogin(error) {
    if (error.status === 0) {
      let userIsExist = this.auth.checkLoginEntryItems(this.loginForm.value);
      if (userIsExist) {
        this.auth.setActiveUser(this.loginForm.value.username);
        let userMissionExist = this.user.hasOldMission();
        if (userMissionExist) {
          // this.activity.setInfo(this.loginForm.value.username);
          this.user.setInfo(this.loginForm.value.username);
        }
        this.user.localStorageSet.subscribe(
          () => {
            if (!this.socket.autoSender)
              this.myRoute.navigate(['']);
          }
        );
      } else {
        this.message = 'نام کاربری و یا رمز عبور اشتباه است.';
      }
    } else {
      this.message = error.error.text;
    }
  }

  // private initLayers() {
  //   const me = this;
  //   const myLayer: TileLayer = this.mapService.addBaseLayer({
  //     name: 'Bing',
  //     preview: 'resources/images/preview-bing.png',
  //     description: '',
  //     resolutions: [156543.03392804097, 78271.51696402048, 39135.75848201024, 19567.87924100512, 9783.93962050256, 4891.96981025128, 2445.98490512564, 1222.99245256282, 611.49622628141, 305.748113140705, 152.8740565703525, 76.43702828517625, 38.21851414258813, 19.109257071294063, 9.554628535647032, 4.777314267823516, 2.388657133911758, 1.194328566955879, 0.5971642834779395, 0.29858214173896974, 0.14929107086948487, 0.07464553543474244, 0.03732276771737122, 0.01866138385868561, 0.009330691929342804, 0.004665345964671402, 0.002332672982335701, 0.0011663364911678506, 0.0005831682455839253]
  //     ,
  //     source: {
  //       attributions: '',
  //       url: 'http://192.168.3.10:8080/TileServer/tile/vesat?x={x}&y={y}&z={z}'
  //     },
  //     title: 'Bing',
  //     visible: false
  //   });
  //   const twice: TileLayer = this.mapService.addBaseLayer({
  //     name: 'Bing',
  //     preview: 'resources/images/preview-bing.png',
  //     description: '',
  //     resolutions: [156543.03392804097, 78271.51696402048, 39135.75848201024, 19567.87924100512, 9783.93962050256, 4891.96981025128, 2445.98490512564, 1222.99245256282, 611.49622628141, 305.748113140705, 152.8740565703525, 76.43702828517625, 38.21851414258813, 19.109257071294063, 9.554628535647032, 4.777314267823516, 2.388657133911758, 1.194328566955879, 0.5971642834779395, 0.29858214173896974, 0.14929107086948487, 0.07464553543474244, 0.03732276771737122, 0.01866138385868561, 0.009330691929342804, 0.004665345964671402, 0.002332672982335701, 0.0011663364911678506, 0.0005831682455839253],
  //     source: {
  //       attributions: '',
  //       url: 'http://192.168.3.10:8080/TileServer/tile/osm?x={x}&y={y}&z={z}'
  //     },
  //     title: 'Bing',
  //     visible: true
  //   });


  // }

}
