import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { IActionMapping, TreeModel, TREE_ACTIONS } from 'angular-tree-component';
import { CalkService } from 'src/services/calk/calk.service';
import { timeout } from 'q';
import { delay } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AddLayerComponent } from '../add-layer/add-layer.component';
import { ConfirmDialogComponent } from 'src/components/confirm-dialog/confirm-dialog.component';

const actionMapping: IActionMapping = {
  mouse: {
    dblClick: TREE_ACTIONS.TOGGLE_EXPANDED,
  }
}
@Component({
  selector: 'mobile-app-tree-layers',
  templateUrl: './tree-layers.component.html',
  styleUrls: ['./tree-layers.component.css']
})
export class TreeLayersComponent implements OnInit {
  activeNode: any;
  @Input() vectorLayers;
  @Input() activeLayer;
  @Input() layers;
  @Output() activeLayerChange = new EventEmitter();
  @Output() vectorLayersChange = new EventEmitter();

  @ViewChild('tree') tree;

  public options = {
    rtl: true,
    useCheckbox: true,
    isExpandedField: 'expanded',
    animateExpand: true,
    animateSpeed: 30,
    animateAcceleration: 1.2,
    useVirtualScroll: true,
    actionMapping
  }

  //public layers;
  constructor(
    public calkService: CalkService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.tree.treeModel.expandAll();
    }, 0);
  }

  public returnLayerById(rootLayer, layerId) {
    if (rootLayer.id == layerId)
      return rootLayer;

    if (rootLayer.children) {
      rootLayer.children.forEach(element => {
        return this.returnLayerById(element, layerId)
      });
    }
    return null;
  }
  public removeLayerById(parent, layerIdToRemove) {
    let that = this;
    parent.children = parent.children
      .filter(function (ch) { return ch.id != layerIdToRemove })
      .map(function (ch) { return that.removeLayerById(ch, layerIdToRemove) });

    return parent;
  }
  public onRemoveNode() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        Dialog: 'با حذف لایه، تمایی زیرلایه ها و المان های آن ها حذف خواهند شد! آیا مطمینید؟',
      }
    });
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data == 1) {
          this.calkService.removeLayer(this.activeNode.data.id).subscribe(
            (res) => {
              this.activeLayer = null;
              this.vectorLayersVisibility(this.activeNode.data, false);
              this.removeLayerById(this.layers[0], this.activeNode.data.id);
              this.tree.treeModel.update();
            }
          );
        }
      }
    )

  }
  public onAddNode(type) {
    const dialogRef = this.dialog.open(AddLayerComponent, {
      data: type
    })
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          let newLayer = {
            "dtype": type,
            "name": data,
            "parent": {
              "id": this.activeNode.data.id
            }
          }

          this.calkService.addLayer(newLayer).subscribe(
            (res) => {
              if (!this.activeNode.data.children)
                this.activeNode.data.children = []
              this.activeNode.data.children.push(res);
              this.tree.treeModel.update();
              this.tree.treeModel.expandAll();
            }
          )
        }

      }
    );
  }

  public activateLayer(e) {
    this.vectorLayers.forEach(vectorLayer => {
      if (vectorLayer.get('layerId') == e.node.data.id) {
        // vectorLayer.setVisible(!vectorLayer.getVisible());
        this.activeLayer = vectorLayer;
        this.activeLayerChange.emit(this.activeLayer);
      }
    });
    this.activeNode = e.node;
  }
  public deactivateLayer(e) {
    this.activeLayer = null;
    this.activeLayerChange.emit(this.activeLayer);
    this.activeNode = null;
  }

  public checkLayer(e) {
    this.vectorLayersVisibility(e.node.data, true)
    console.log(e)
  }
  public uncheckLayer(e) {
    this.vectorLayersVisibility(e.node.data, false)
  }

  public vectorLayersVisibility(rootLayer, flag) {
    let that = this;
    this.vectorLayers.forEach(vectorLayer => {
      if (vectorLayer.get('layerId') == rootLayer.id) {
        vectorLayer.setVisible(flag);
      }
    });

    rootLayer.children.forEach(ch => {
      that.vectorLayersVisibility(ch, flag);
    })

    return true;
  }
}
