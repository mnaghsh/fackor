import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import GeoJSON from 'ol/format/GeoJSON';
import Fill from 'ol/style/fill';
import Text from 'ol/style/text';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import RegularShape from 'ol/style/regularShape';
import Feature from 'ol/Feature';
import CircleStyle from 'ol/style/Circle';
import { style } from '@angular/animations';

const fontIcons = {

  //units And Installations
  RECTANGLE: '\ua900',
  INSTALLATIONS_PASGAH_FARMANDEHI: '\ua901',
  INSTALLATIONS_POSHTIBANI_MANTAQE: '\ua906',
  INSTALLATIONS_FARMANDEHI_LOJESTIKI: '\ua908',
  INSTALLATIONS_POST_DIDEH_BANI: '\ua902',
  INSTALLATIONS_POSHTIBANI_KHADAMATE_RAZM_BONEH: '\ua903',
  INSTALLATIONS_POSHTIBANI_KHADAMATE_RAZM: '\ua904',
  INSTALLATIONS_KHADAMATE_RAZMI_POSHTIBANI_MANTAQE: '\ua905',
  INSTALLATIONS_POSHTIBANI_KHADAMATE_LOJESTIKI: '\ua907',

  //Units
  PIADEH: '\ua500',
  PIADEH_HAVABORD: '\ua501',
  MEKANIZEH: '\ua502',
  ZEREHI: '\ua503',
  SAVAR_ZEREHI: '\ua504',
  SHENASAYEE: '\ua505',
  TOOPKHANE: '\ua506',
  MOHANDESI_RAZMI: '\ua507',
  MOKHABERAT: '\ua508',
  A10: '\ua509',
  SAR_RESHTEEE: '\ua510',
  TARABARI: '\ua511',
  ORDNANCE: '\ua512',
  DEZHBAN: '\ua513',
  PADAFAND_HAVAYEE: '\ua514',
  ZED_TANK: '\ua515',
  KOOHESTANI: '\ua516',
  NEGAHDARI: '\ua517',
  JAIGOZINI: '\ua518',
  RAKET_MOOSHAK_HEDAYAT: '\ua519',
  CHATR_BAZ: '\ua520',
  AMADI: '\ua521',
  POL_MOHANDESI_RAZMI: '\ua522',
  HAVANIROOZ: '\ua523',
  JANK_ELECTRONIC: '\ua524',
  POSHTIBAN_ETTELAAT_RAZMI: '\ua525',
  SHIMIAYI: '\ua526',
  NIROO_VIGEH: '\ua527',
  NIROO_HAVAYEE: '\ua528',
  MOTAHARREK_HAVAYEE: '\ua529',
  KHADAMAT: '\ua530',
  AMAD_TARABARI: '\ua531',
  SAVAR_HAVAYEE: '\ua532',
  JANG_RAVANI: '\ua533',

  //Weapon
  TIRBAR_LIGHT: '\ua000',
  TIRBAR_MEDIUM: '\ua001',
  TIRBAR_LARGE: '\ua002',
  KHOMPAREH_LIGHT: '\ua010',
  KHOMPAREH_MEDIUM: '\ua011',
  KHOMPAREH_LARGE: '\ua012',
  ZED_HAVAYEE_LIGHT: '\ua020',
  ZED_HAVAYEE_MEDIUM: '\ua021',
  ZED_HAVAYEE_LARGE: '\ua022',
  MOOSHAK_ANDAZ_LIGHT: '\ua030',
  MOOSHAK_ANDAZ_MEDIUM: '\ua031',
  MOOSHAK_ANDAZ_LARGE: '\ua032',
  TOOP_LIGHT: '\ua040',
  TOOP_MEDIUM: '\ua041',
  TOOP_LARGE: '\ua042',
  TOOP_ZED_TANK_LIGHT: '\ua050',
  TOOP_ZED_TANK_MEDIUM: '\ua051',
  TOOP_ZED_TANK_LARGE: '\ua052',
  TOOP_ZED_HAVAYEE_LIGHT: '\ua060',
  TOOP_ZED_HAVAYEE_MEDIUM: '\ua061',
  TOOP_ZED_HAVAYEE_LARGE: '\ua062',
  HOWITZER_LIGHT: '\ua070',
  HOWITZER_MEDIUM: '\ua071',
  HOWITZER_LARGE: '\ua072',
  TOFANG_LIGHT: '\ua080',
  TOFANG_MEDIUM: '\ua081',
  TOFANG_LARGE: '\ua082',
  MOOSHAK_RAKET_LIGHT: '\ua090',
  MOOSHAK_RAKET_MEDIUM: '\ua091',
  MOOSHAK_RAKET_LARGE: '\ua092',
  MOOSHAK_ZED_HAVAYEE_LIGHT: '\ua100',
  MOOSHAK_ZED_HAVAYEE_MEDIUM: '\ua101',
  MOOSHAK_ZED_HAVAYEE_LARGE: '\ua102',
  MOOSHAK_ZED_TANK_LIGHT: '\ua110',
  MOOSHAK_ZED_TANK_MEDIUM: '\ua111',
  MOOSHAK_ZED_TANK_LARGE: '\ua112',
  SAKOO_ZAMIN_ZAMIN_LIGHT: '\ua120',
  SAKOO_ZAMIN_ZAMIN_MEDIUM: '\ua121',
  SAKOO_ZAMIN_ZAMIN_LARGE: '\ua122',
  SAKOO_ZAMIN_HAVA_LIGHT: '\ua130',
  SAKOO_ZAMIN_HAVA_MEDIUM: '\ua131',
  SAKOO_ZAMIN_HAVA_LARGE: '\ua132',

  //UnitSize
  GROUP: '\ua600',
  RASAD: '\ua601',
  DASTEH: '\ua602',
  GROUHAN: '\ua603',
  GORDAN: '\ua604',
  HANG: '\ua605',
  TIP: '\ua606',
  LASHGAR: '\ua607',
  SEPAH: '\ua608',
  ARTESH: '\ua609',
  GROUP_ARTESH: '\ua60a',

  //vehicles
  TANK_LIGHT: '\ua301',
  TANK_MEDIUM: '\ua302',
  TANK_LARGE: '\ua303',
  SARBAZ_BAR_LIGHT: '\ua311',
  SARBAZ_BAR_MEDIUM: '\ua311',
  SARBAZ_BAR_LARGE: '\ua313',
  KHODRO_SHENASAYEE_LIGHT: '\ua321',
  KHODRO_SHENASAYEE_MEDIUM: '\ua322',
  KHODRO_SHENASAYEE_LARGE: '\ua323',
  TUP_HOJUMI_LIGHT: '\ua331',
  TUP_HOJUMI_MEDIUM: '\ua332',
  TUP_HOJUMI_LARGE: '\ua333',
  TANK_DAR_MOZE_LIGHT: '\ua341',
  TANK_DAR_MOZE_MEDIUM: '\ua342',
  TANK_DAR_MOZE_LARGE: '\ua343',

  //Mines
  NAMOSHAKHAS: '\ua720',
  ZED_NAFAR: '\ua721',
  ZED_TTANK: '\ua722',
  ZED_TANK_TALE: '\ua723',
  TALE_ENFEJARI: '\ua724',
  RADIF_MINE_ZED_TANK: '\ua725',
  RADIF_MINE_ZED_NAFAR: '\ua726',
  KHOSHE_MINE: '\ua727',
  MEYDAN_MINE_TANK_NAFAR: '\ua728',
  MEYDAN_MINE_ZED_TANK: '\ua729',
  MEYDAN_MIN_TANK_NAFAR_SHEKAF: '\ua72a',

  //Stations
  RADAR: '\ua700',
  RADIO_BA_BISIM: '\ua701',
  RADIO_RELE: '\ua702',
  POL: '\ua707',
  TOONEL: '\ua708',
  HELIKOOPTER: '\ua709',
  HELIKOOPTER_BOUND: '\ua70a',

  //Strongs
  STRONG_POINT: '\ua752',

  //Obstacles
  DASTAK: '\ua735',
  PISHNAHADI: '\ua736',
  AMADEH: '\ua737',
  KAMEL: '\ua738',

  //Other
  TRANSIT_true: '\ua704',
  TRANSIT_false: '\ua703',
  PILLAR_true: '\ua705',
  PILLAR_false: '\ua706',

  //Actions
  ACTIONS_COORDINATION_POINT: '\ua932',
  ACTIONS_INTERCEPT_POINT: '\ua933',
  ACTIONS_CONTACT_POINT: '\ua931',
  ACTIONS_CONCAT_POINT: '\ua930'
};



var textFill = new Fill({
  color: '#fff'
});

@Injectable({
  providedIn: 'root'
})

export class StyleService {

  UnitFeatureStyle(text: any, offsetX: any, offsetY: any, rotation: any, magnify: any, feature: any) {
    // debugger

    let styles = []


    console.log('UnitFeatureStyle')
    let sizeStyle = new Style({
      text: new Text({
        text: this.getFontIconByString(feature.get('size')),
        offsetY: -40,

        font: 50 + 'px Jangafzar',
        fill: new Fill({
          color:feature.get('featureColor'),
        }),
      })

    });
    styles.push(sizeStyle)
    let typeStyle = new Style({
      text: new Text({
        text: this.getFontIconByString(feature.get('type')),
        font: 50 + 'px Jangafzar',
        fill: new Fill({
          color:feature.get('featureColor'),
        }),
      })

    });
    styles.push(typeStyle)
    let tempStyle = new Style({
      text: new Text({
        text: this.getFontIconByString('RECTANGLE'),
        font: 50 + 'px Jangafzar',
        fill: new Fill({
          color:feature.get('featureColor'),
        }),
      })

    });
    styles.push(tempStyle)
    let textStyle = new Style({
      text: new Text({
        text: feature.get('label'),
        font: '15px IRANSansWeb',
        offsetX: -80,
        fill: new Fill({
          color:feature.get('featureColor'),
        }),
      })

    });
    styles.push(textStyle)

    let color = new Style({
      text: new Text({
        text: feature.get('label'),
        font: '15px IRANSansWeb',
        offsetX: -80,
       
        fill: new Fill({
          color:feature.get('featureColor'),
        }),
      }),
    });


    styles.push(color)
    return styles;

    // return [rectangleStyle, multipleStyle, tempStyle];
  }
  polygonStyle(color, width, fill, text): any {
    console.log('polygonStyle', color, width, fill, text);
    console.log('polygonStyle');
    return new Style({

      stroke: new Stroke({
        color: color,
        width: width

      }),
      fill: new Fill({
        color: fill,
      }),

      text: new Text({

        text: text,
        // overflow: true,
        fill: textFill,
        font: '20px IRANSansWeb',

      })
    })
  }
  lineStringStyle(color, width, fill, text): any {
    console.log('lineStringStyle', color, width, fill, text);
    return new Style({
      stroke: new Stroke({
        color: color,
        width: width
      }),
      fill: new Fill({
        color: fill,
      }),
      text: new Text({

        text: text,
        // overflow: true,
        placement: 'line',
        fill: textFill,
        font: '20px IRANSansWeb',
      })
    })

    // console.log('lineStringStyle');
    // throw new Error("Method not implemented.");
  }
  LimitLine(color, width, fill) {

    console.log('LimitLine', color, width, fill);
    return new Style({
      stroke: new Stroke({
        color: color,
        width: width
      }),
      fill: new Fill({
        color: fill,
      }),
      text: new Text({

      })
    })
  }

  pointStyle(color, width, fill, radius, text): any {

    console.log('pointStyle');
    console.log('pointStyle', color, width, fill, radius);

    return new Style({
      image: new CircleStyle({
        radius: radius,
        fill: new Fill({
          color: color,
        }),
        stroke: new Stroke({
          color: color,
          width: width
        }),
      })
      ,
      text: new Text({

        text: text,
        offsetY: 50,
        // placement: 'line',
        fill: textFill,
        font: '20px IRANSansWeb',
      })
    })
  }
  watchOutStyle(fill, text, color, width,feature) {

    console.log('watchOutStyle')
    let styles = []
    let mainStyle = new Style({
      text: new Text({
        text: this.getFontIconByString("INSTALLATIONS_POST_DIDEH_BANI"),
        offsetY: -40,

        font: 50 + 'px Jangafzar',
        fill: new Fill({
          color:feature.get('featureColor'),

        })
      })

    });
    let textStyle = new Style({
      text: new Text({
        text: text,
        offsetY: 30,
        font: '20px IRANSansWeb',
        fill: new Fill({
          color:feature.get('featureColor'),
        })
      })

    });
    styles.push(mainStyle)
    return styles;

    // return new Style({

    //   image: new RegularShape({
    //     fill: new Fill({
    //       color: fill,
    //       width: 10
    //     }),
    //     stroke: new Stroke({
    //       color: color,
    //       width: width

    //     }),
    //     points: 3,
    //     radius: 30,
    //     rotation: Math.PI / 0.5,
    //     angle: 0

    //   }),

    //   text: new Text({

    //     text: text,
    //     offsetY: 30,
    //     // overflow: true,
    //     // placement: 'line',
    //     fill: textFill,
    //     font: '20px IRANSansWeb',

    //   })
    // })
  }
  public getFontIconByString(string) {
    //  debugger
    let mhd
    if (fontIcons[string]) {
      mhd = fontIcons[string];
      return fontIcons[string];
    }
    return '';
  };
  constructor(
  ) {

  }

}
