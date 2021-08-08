import {Component, OnDestroy, OnInit, Injector} from '@angular/core';
import {UsersService} from '../../../../services/users/users.service';
import {LocalStorageService} from "../../../../services/local-storage/local-storage.service";
import {SocketService} from "../../../../services/socket/socket.service";
import {MessagesService} from "../../../../services/messages/messages.service";
import {MatDialog} from "@angular/material";
import {FavaMap} from "fava-map";
import View from 'ol/View';
import OlProj from 'ol/proj';
import {ActivatedRoute, Router} from "@angular/router";
import {FavaLayerService, FavaLayer, FavaLayersInterface} from 'fava-layer';
import {TrackingService} from '../../../../services/tracking/tracking.service';
import {ConfigStyleService} from "../../../../services/config-style.service";
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import {SettingsComponent} from 'src/mobile-app/pages/tracking/components/settings/settings.component';
import {Observable, Subject} from 'rxjs';
import MousePosition from "ol/control/MousePosition";
import ScaleLine from 'ol/control/ScaleLine';
import ZoomSlider from 'ol/control/ZoomSlider';
import OlMap from "ol/Map";
import {delay} from 'rxjs/operators';
import {CalkService} from '../../../../services/calk/calk.service';
import { ConfigService } from '../../../../services/config.service';
import { CommonService } from '../../../../services/common/common.service';



const mousePositionControl = new MousePosition({
  undefinedHTML: 'نشانگر در نقشه نیست'
});

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {
  trackTime: any = 99999999999999;
  minOfTimes: any;
  summery: any;
  minOfHistoryTimes;
  liveTime;
  fromTop: any;
  fromLeft: any;
  refreshtime;
  visibility = false;
  intervals = [];
  currentUserId: any;
  checked;
  CurrentUserActiveMission: any;
  public activeUserInfo: any;
  public newMessages: Array<any>;
  public orgForFightUsers = [];
  mode = true;
  private favaLayer;


  constructor(public userService: UsersService,
    private dialog: MatDialog,
    private localStorage: LocalStorageService,
    private socketService: SocketService,
    private messageService: MessagesService,
    private bottomSheet: MatDialog,
    private mapService: FavaMap,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private myRoute: Router,
    private configService: ConfigService,
    private injector: Injector,
    private commonService: CommonService,
    private trackService: TrackingService,
    private configStyleService: ConfigStyleService) {
    this.currentUserId = this.usersService.getUserInfo().id;
    this.CurrentUserActiveMission = this.usersService.getMission().id;

  }


  ngOnInit() {

    const refreshMap = () => {
      this.mapService.setTarget('');
      this.mapService.setTarget('calk-map');
    };
    this.mapService.getMap().on('change:view', refreshMap);
    this.activeUserInfo = this.userService.getUserInfo();
    this.getUsers();
    // if (this.trackService.canInitLayers) {
    this.trackService.moduleMap = new Map();
    this.initializeMap();
    this.initializeUsersLayer();
    this.trackService.canInitLayers = false;
    // }
    // const iconFeature = new Feature(new Point([31, 54]));
    // const temp = new VectorLayer({
    //   zIndex: 2000000,
    //   source: new VectorSource({features: [iconFeature]})
    // })
    // this.mapService.getMap().addLayer(temp)
    const myMap = new OlMap({
      target: 'calk-map'
    });
    this.mapService.setMap(myMap);
    refreshMap();
    console.log(this.mapService.getMap().getInteractions());
    const me = this;
    this.addMousePosition();
    this.addScaleLine();
    this.addZoomSlider();
    // this.mapService.getMap().on('click', function (evt) {
    //   // me.displayFeatureInfo(evt.pixel, evt);
    // });
  }

  ngOnDestroy() {
    this.orgForFightUsers.forEach(
      (orgForFightUser) => {
        const trackModule = this.trackService.moduleMap.get(orgForFightUser.user.id);
        trackModule.stopTrack();
        clearInterval(orgForFightUser.myIntervalId);
        trackModule.trackLayer.setVisible(true);
        trackModule.historyLayer.setVisible(true);
        this.clear(orgForFightUser).subscribe();
      }
    );
  }

  initializeMap() {
    this.favaLayer = new FavaLayer(this.mapService, this.injector);
    this.favaLayer.run("../assets/2ndTileLayer.json").subscribe(
      () => {
        const view = new View({
          center: [0, 0],
          zoom: 3,
          minZoom: 2,
          maxZoom: 11
        });
        this.mapService.getMap().setView(view);
      }
    );
  }

  initializeUsersLayer() {
    this.orgForFightUsers.forEach(
      (orgForFightUser) => {
        const mhd = this.favaLayer.addLayer({
          type: ".TrackLayer",
          liveUrl: this.configService.localVariables.baseUrl + "/lastuserposition",
          liveBody: {
            id: orgForFightUser.user.id
          },
          historyUrl: this.configService.localVariables.baseUrl + "/searchtrackdata",
          historyBody: {}
        });
        this.trackService.moduleMap.set(orgForFightUser.user.id, mhd);
      }
    );
  }

  // findLivePointTime(trackModule, orgForFight) {
  // }
  //<MN>
  startTrack(orgForFight) {
    if (!this.getUserStatus(orgForFight.user.id)) {
      debugger
      this.commonService.showEventMessage("شخص مورد نظر به شبکه متصل نیست!")
      return;
    }
    this.commonService.showEventMessage("شروع ردگیری...")
    orgForFight.play = !orgForFight.play;
    this.refreshtime = Number(orgForFight.refreshtime);
    const trackModule = this.trackService.moduleMap.get(orgForFight.user.id);
    trackModule.startTrack(
      [{
        "sender": {"id": orgForFight.user.id}
      }],
      this.refreshtime
    );
    this.callHistory(trackModule, orgForFight);//set interval for geting history with refreshTime
  }

  //<MN>
  private callHistory(trackModule, orgForFight) {
    console.log('trackModule.trackLayer.getSource()', trackModule.trackLayer.getSource())
    console.log('trackModule.trackLayer.getSource()', trackModule.historyLayer.getSource())

    orgForFight.myIntervalId = setInterval(() => {
      this.updateMinestTime(trackModule.trackLayer.getSource());
      this.updateMinestTime(trackModule.historyLayer.getSource());
      trackModule.enableHistory([{
        sender: {
          id: orgForFight.user.id
        },
        mission: {
          id: this.CurrentUserActiveMission
        },

        start_time: this.trackTime

      }]);
    }, Number(this.refreshtime) * 1000);

  }

  updateMinestTime(source) {
    debugger
    //find minimum time between liveTrack and historyTrack.
    const features = source.getFeatures()
    // debugger
    // if (features.length > 0) {
    features.forEach(element => {
      console.log('element', element.values_.time)

      console.log('mhdtracktimeBefore', this.trackTime)
      if (element.values_.time && this.trackTime > element.values_.time)
        this.trackTime = element.values_.time
      console.log('mhdtracktimeAfter', this.trackTime)
    })
    // }
  }

  //<MN>
  stopTrack(orgForFight) {
    const trackModule = this.trackService.moduleMap.get(orgForFight.user.id);
    //stop kardane interval dakhele fava layer
    trackModule.stopTrack();
    //stop kardane interval dakhele fakur
    clearInterval(orgForFight.myIntervalId);
    orgForFight.play = !orgForFight.play;

  }

  public enableHistory(orgForFight) {
    let s = new Date(orgForFight['start']);
    let e = new Date(orgForFight['end']);

    const trackModule = this.trackService.moduleMap.get(orgForFight.user.id);
    console.log(' history', trackModule.historyLayer.getSource().getFeatures());
    trackModule.enableHistory([{
      sender: {
        id: orgForFight.user.id
      },
      mission: {
        id: this.CurrentUserActiveMission
      },
      start_time: s.getTime(),
      end_time: e.getTime()
    }]);
  }

  //<MN>
  clear(orgForFight): Observable<any> {
    let sub = new Subject<any>();
    const trackModule = this.trackService.moduleMap.get(orgForFight.user.id);
    //call disableHistory in fava layer.remove all historyLayer feature.
    trackModule.disableHistory();
    trackModule.removeFeatures(trackModule.trackLayer);
    //set track time largest for it not be undefined.
    this.trackTime = 99999999999999;
    console.log(' this.trackTime', this.trackTime);
    sub.next();
    return sub;
  }

  changeVisibilityLayer(orgForFight) {
    const trackModule = this.trackService.moduleMap.get(orgForFight.user.id);
    trackModule.trackLayer.setVisible(orgForFight.visibilityLayer);
    trackModule.historyLayer.setVisible(orgForFight.visibilityLayer);
  }

  getUsers() {
    this.orgForFightUsers = this.userService.getOrgForFightUsers();
    console.log('this.orgForFightUsers', this.orgForFightUsers);
    this.orgForFightUsers.forEach(
      (orgForFightUser) => {
        orgForFightUser.visibilityLayer = true;
      }
    );
  }

  showBarsToggle() {
    this.configStyleService.showNavBar.next();
  }

  getUserStatus(id) {
    return this.socketService.userIsOnline(id);
  }

  private navigate(element) {
    element.play = !element.play;
    console.log('element', element);
  }

  public showInputs(element) {
    element.inputs = !element.inputs;
  }

  private settings(orgForFight) {
    console.log('orgForFight', orgForFight);
    const dialogRef = this.dialog.open(SettingsComponent, {

      data: orgForFight.user.id
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          console.log('dataa', data);
          orgForFight.refreshtime = data;

          this.clear(orgForFight).subscribe(
            (data) => {
              this.startTrack(orgForFight);
            }
          );
        }
      }
    );
  }

  private displayFeatureInfo(pixel, evt) {
    const me = this;
    const feature = this.mapService.getMap().forEachFeatureAtPixel(pixel, function (feature) {
      return feature;
    });

    if (feature) {
      console.log('ha ha', feature);
      console.log('feature.values_.senderId.lastname', feature.values_);
      this.visibility = true;
      this.fromLeft = evt.pointerEvent.clientX;
      this.fromTop = evt.pointerEvent.clientY;
      // this.summery = feature.values_.senderId.lastname;
      this.summery = feature.values_.time;

      let mmhd = feature.values_.mission.lastname;

    } else {
      console.log('&nbsp;');
      this.visibility = false;
    }

    // if (feature !== me.highlight) {
    //   if (me.highlight) {
    //     if (me.highlight.getGeometry().getType() == 'Point')
    //       me.highlight.setStyle(pointStyle);
    //     else
    //       me.highlight.setStyle(style);
    //   }
    //   if (feature) {
    //     if (feature.getGeometry().getType() == 'Point')
    //       feature.setStyle(pointStyle);
    //     else
    //       feature.setStyle(highlightStyle);
    //   }
    //   me.highlight = feature;
    // }

  }

  addMousePosition() {
    const mousePositionCtrl = new MousePosition({
      projection: 'EPSG:4326',
      className: 'custom-mouse-position',
      target: 'mouse-position',
      undefinedHTML: '&nbsp;'
    });
    this.mapService.getMap().addControl(mousePositionCtrl);
  }

  addScaleLine() {

    const scaleLineCtrl = new ScaleLine({
      target: 'scale-line-box',
      className: 'scale-line-box',
    });
    this.mapService.getMap().addControl(scaleLineCtrl);
  }

  addZoomSlider() {
    const myFunc = function (e) {
      const s = document.getElementsByClassName('ol-zoomslider-thumb ol-unselectable');
      s[0].innerHTML = e.map.getView().getZoom().toFixed();
    };
    const zoomSliderCtrl = new ZoomSlider();

    this.mapService.getMap().addControl(zoomSliderCtrl);
    this.mapService.getMap().on('moveend', myFunc);
  }
}


