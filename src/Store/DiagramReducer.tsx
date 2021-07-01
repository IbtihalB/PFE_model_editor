import go, { CommandHandler, Margin, Model, Size, TextBlock } from "gojs";
import { AnyAction } from "redux";
import { onselectField, onSelectionChanged, onSelectionChanged2, onunselectField } from "../Layouts/Layout";
import Corbeille from '../icons/icons8-trash-50.png';
import menu from '../icons/icons8-menu-vertical-100.png';
import zero from '../icons/nombre0.png'
import one from '../icons/nombre1.png'



  export class InitialDiagramComponents{
    
    $=go.GraphObject.make;
    nodeDataArray=[]
    linkDataArray=[];
    model=go.GraphObject.make(go.GraphLinksModel,
              { //nodeKeyProperty: "key",
              copiesArrays: true,
              copiesArrayObjects: true,
              linkFromPortIdProperty: "fromPort",
              linkToPortIdProperty: "toPort",
              nodeDataArray: this.nodeDataArray,
              linkDataArray:this.linkDataArray});
    diagram=this.$(go.Diagram, {allowDelete: false,
              allowCopy: false,
              layout: go.GraphObject.make(go.ForceDirectedLayout),
              "undoManager.isEnabled": true,"contextMenuTool.isEnabled": false,
              "LinkDrawn": function(e) {
                var link = e.subject;
                link.isSelected = false;
                var orig = link.toShortLength;
                link.toShortLength = 2;
                var anim = new go.Animation();
                var sw = link.path.strokeWidth;
                anim.add(link.path, "strokeWidth", sw, sw+5);
                anim.add(link.elt(1), "strokeWidth", sw, sw+5);
                anim.reversible = true;
                anim.finished = function(a) { link.toShortLength = orig; link.isSelected = true; };
                anim.start();
              },
               model:this.model });
          
    init=():go.Diagram=>{ 
    let diagram=this.diagram 
    diagram.currentTool.doCancel()
   
    let changeColor=(diagram: go.Diagram, type: any,source:any,item:any)=> {
      // Always make changes in a transaction, except when initializing the diagram.
      diagram.startTransaction("change type");
     
         // ignore any selected Links and simple Parts
          // Examine and modify the data, not the Node directly.
          var data = item.data;
          // Call setDataProperty to support undo/redo as well as
          // automatically evaluating any relevant bindings.
          diagram.model.setDataProperty(data, "type",type );
          diagram.model.setDataProperty(data, "source",source );

        }

        let foreignkey=(fromnode:any, fromport:any, tonode:any, toport:any)=> {
          
                                   var node = diagram.findNodeForKey(fromnode.part.data.key);
                                  if (node !== null) 
                                  {diagram.startTransaction();
                                  diagram.model.addArrayItem(node.data.items,{name:"new field",type:tonode.part.data.key,source:one,isPrimarykey:false,isInvisible:false,isUnique:false,isNeverNull:false});
                                  diagram.commitTransaction("item added");}
          return fromnode.data.color === tonode.data.color;
          // this could look at the fromport.fill and toport.fill instead,
          // assuming that the ports are Shapes, which they are because portID was set on them,
          // and that there is a data Binding on the Shape.fill
        }
        
        // only allow new links between ports of the same color
        diagram.toolManager.linkingTool.linkValidation = foreignkey;
        
        // only allow reconnecting an existing link to a port of the same color
        diagram.toolManager.relinkingTool.linkValidation = foreignkey;

        let findAllSelectedItems=()=> {
          var items :any;
          for (var nit = diagram.nodes; nit.next();) {
            var node = nit.value;
            var table = node.findObject("TABLE");
              if(table!==null)
              if(table.part!==null)
              for (var iit = table.part.elements; iit.next();) {
                var itempanel = iit.value;
                if (itempanel.background !== "transparent") items.push(itempanel);
              }
          
          }
          return items;
        }
  
        // Override the standard CommandHandler deleteSelection behavior.
        // If there are any selected items, delete them instead of deleting any selected nodes or links.
        diagram.commandHandler.canDeleteSelection = function() {
          // true if there are any selected deletable nodes or links,
          // or if there are any selected items within nodes
          return go.CommandHandler.prototype.canDeleteSelection.call(diagram.commandHandler) ||
            findAllSelectedItems().length > 0;
        };
  
        diagram.commandHandler.deleteSelection = function() {
          var items = findAllSelectedItems();
          if (items.length > 0) {  // if there are any selected items, delete them
            diagram.startTransaction("delete items");
            for (var i = 0; i < items.length; i++) {
              var panel = items[i];
              var nodedata = panel.part?.data;
              var itemarray = nodedata.fields;
              var itemdata = panel.part?.data;
              var itemindex = itemarray.indexOf(itemdata);
              diagram.model.removeArrayItem(itemarray, itemindex);
            }
          diagram.commitTransaction("delete items");
          } else {  // otherwise just delete nodes and/or links, as usual
            go.CommandHandler.prototype.deleteSelection.call(diagram.commandHandler);
          }
        };
        diagram.commandHandler.pasteSelection = function() {
          var itemClipboard = diagram.commandHandler.pasteFromClipboard;
          var pasteTarget = diagram.selection.first();  // assumes a single node is selected, may need to be changed
          if (itemClipboard && itemClipboard.length > 0 && pasteTarget instanceof go.Node) {
            diagram.startTransaction("paste items");
            
            var it = (itemClipboard as unknown as go.Set<go.Part>).iterator;
            while (it.next()) {
              var panel = it.value
              var itemdata = panel.data;
              var fields = pasteTarget.data.fields;
              diagram.model.addArrayItem(fields, itemdata);  // add the copied panel's data to the selected node's fields
            }
            diagram.commitTransaction("paste items");
          } else {  // otherwise just paste nodes and/or links, as usual
            go.CommandHandler.prototype.pasteSelection.call(diagram.commandHandler);
          }
        }
        let makeButton=(text:any, action:any, visiblePredicate?:any)=> {
          return this.$("ContextMenuButton",
            this.$(go.TextBlock, text),
            { click: action },
            // don't bother with binding GraphObject.visible if there's no predicate
            visiblePredicate ? new go.Binding("visible", "", function(o, e) { return o.diagram ? visiblePredicate(o, e) : false; }).ofObject() : {});
        }

     var nodecontext =
                     this.$("ContextMenu", "RoundedRectangle", 
                     this.$("ContextMenuButton",this.$(go.TextBlock, "   Field   ",/*{stroke: "white", font: "bold 12pt sans-serif"}*/),
                             { click:function(e:any, button:any) {
                                  
                                  if(button.part!== null)
                                   {var node = button.part.adornedObject.panel.panel.part
                                  if (node !== null) {
                                  diagram.startTransaction();
                                  diagram.model.addArrayItem(node.data.items,{name:"new field",type:"gju",source:one,isPrimarykey:false,isInvisible:false,isUnique:false,isNeverNull:false});
                                  diagram.commitTransaction("item added");
                                  }}},
                                  }),
                     this.$("ContextMenuButton",
                     this.$(go.TextBlock, "  Index   "),
                           {  click: function(e, button) {}}));
      var nodcontext =
                           this.$("ContextMenu", 
                           
                           this.$("ContextMenuButton",
                               this.$(go.TextBlock, "Alpha",{margin:new go.Margin(0,25,0,3)},/*{stroke: "white", font: "bold 12pt sans-serif"}*/),
                                   { click:function(e, button) {
                                      
                                       changeColor(diagram,"Alpha",menu,button.part)                                      
                                        }},
                                        
                                        this.$(go.Picture, {width: 20, height: 17,source:menu ,alignment:go.Spot.TopRight,background:"#424242" })),
                          
                          this.$("ContextMenuButton",
                               this.$(go.TextBlock, "Text",{margin:new go.Margin(0,25,0,3)}),
                                 {  click: function(e, button) {
                                  changeColor(diagram,"Text",Corbeille,button.part) 
                                 }},
                                 this.$(go.Picture, {width: 20, height: 17,source:Corbeille,alignment:go.Spot.TopRight,background:"#424242"  }),
                                 ),
                          this.$("ContextMenuButton",
                           this.$(go.TextBlock, "Date",{margin:new go.Margin(0,25,0,3)}),
                                 {  click: function(e, button) {
                                  changeColor(diagram,"Date",Corbeille,button.part) 
                                 }},
                                 this.$(go.Picture, {width: 20, height: 17,source:Corbeille,alignment:go.Spot.TopRight,background:"#424242"  }),
                                 )
                                 ,
                          this.$("ContextMenuButton",
                           this.$(go.TextBlock, "Time",{margin:new go.Margin(0,25,0,3)}),
                                 {  click: function(e, button) {
                                  changeColor(diagram,"Time",Corbeille,button.part) 
                                 }},
                                 this.$(go.Picture, {width: 20, height: 17,source:Corbeille,alignment:go.Spot.TopRight,background:"#424242"  }),
                                 )
                                 ,
                          this.$("ContextMenuButton",
                           this.$(go.TextBlock, "Boolean",{margin:new go.Margin(0,25,0,3)}),
                                 {  click: function(e, button) {
                                  changeColor(diagram,"Boolean",Corbeille,button.part) 
                                 }},
                                 this.$(go.Picture, {width: 20, height: 17,source:Corbeille,alignment:go.Spot.TopRight,background:"#424242"  }),
                                 )
                                 ,
                          this.$("ContextMenuButton",
                           this.$(go.TextBlock, "Picture",{margin:new go.Margin(0,25,0,3)}),
                                 {  click: function(e, button) {
                                  changeColor(diagram,"Picture",Corbeille,button.part) 
                                 }},
                                 this.$(go.Picture, {width: 20, height: 17,source:Corbeille,alignment:go.Spot.TopRight,background:"#424242"  }),
                                 )
                                 ,
                          this.$("ContextMenuButton",
                           this.$(go.TextBlock, "Blob",{margin:new go.Margin(0,25,0,3)}),
                                 {  click: function(e, button) {
                                  changeColor(diagram,"Blob",Corbeille,button.part) 
                                 }},
                                 this.$(go.Picture, {width: 20, height: 17,source:Corbeille,alignment:go.Spot.TopRight,background:"#424242"  }),
                                 )
                                 ,
                          this.$("ContextMenuButton",
                           this.$(go.TextBlock, "Object",{margin:new go.Margin(0,25,0,3)}),
                                 {  click: function(e, button) {
                                  changeColor(diagram,"Object",Corbeille,button.part) 
                                 }},
                                 this.$(go.Picture, {width: 20, height: 17,source:Corbeille,alignment:go.Spot.TopRight,background:"#424242"  }),
                                 ))
      var fieldcontext=this.$("ContextMenu", 
      this.$("ContextMenuButton",
            this.$(go.TextBlock, "Insert Field",{margin:new go.Margin(0,25,0,3)}),
            {  click: function(e, button:any) {             
                if(button.panel!== null)
                 {var node =button.part.adornedObject.panel.panel.panel.part 
                if (node !== null && node !==undefined) {
                diagram.startTransaction();
                diagram.model.addArrayItem(node.data.items,{name:"new field",type:"gju",source:one,isPrimarykey:false,isInvisible:false,isUnique:false,isNeverNull:false});
                diagram.commitTransaction("item added");
                }}},
                }
            ,
            this.$(go.Picture, {width: 20, height: 17,source:Corbeille,alignment:go.Spot.TopRight,background:"#424242" }),
            ),
            this.$("ContextMenuButton",
            this.$(go.TextBlock, "Copy ",{margin:new go.Margin(0,25,0,3)}),
            {  click: function(e, button) {             
              diagram.commandHandler.copySelection = function() {
                var items = findAllSelectedItems() ;
                if (items.length > 0) {  // if there are any selected items, save them to a clipboard
                  diagram.commandHandler.copyToClipboard ( items );
                } else {  // otherwise just copy nodes and/or links, as usual
                  go.CommandHandler.prototype.copySelection.call(diagram.commandHandler);
                }
              }
              diagram.commandHandler.pasteSelection = function() {
                var itemClipboard = diagram.commandHandler.pasteFromClipboard;
                var pasteTarget = diagram.selection.first();  // assumes a single node is selected, may need to be changed
                if (itemClipboard && itemClipboard.length > 0 && pasteTarget instanceof go.Node) {
                  diagram.startTransaction("paste items");
                  
                  var it = (itemClipboard as unknown as go.Set<go.Part>).iterator;
                  while (it.next()) {
                    var panel = it.value
                    var itemdata = panel.data;
                    var fields = pasteTarget.data.fields;
                    diagram.model.addArrayItem(fields, itemdata);  // add the copied panel's data to the selected node's fields
                  }
                  diagram.commitTransaction("paste items");
                } else {  // otherwise just paste nodes and/or links, as usual
                  go.CommandHandler.prototype.pasteSelection.call(diagram.commandHandler);
                }
              }
            
                }}
            ,
            this.$(go.Picture, {width: 20, height: 17,source:Corbeille,alignment:go.Spot.TopRight,background:"#424242" }),
            ),

          

            this.$("ContextMenuButton",{contextMenu:nodcontext},
            this.$(go.TextBlock, "Type",{margin:new go.Margin(0,25,0,3)}),
            {  click: function(e, button) {
              var node = button.part;
              if(node!==null)
                {var button_coordinates=button.getDocumentPoint(go.Spot.BottomCenter);
                diagram.toolManager.contextMenuTool.positionContextMenu = function(contextMenu, obj) {
                  var b = contextMenu.measuredBounds;
                  
                  contextMenu.position =new go.Point(button_coordinates.x-10,button_coordinates.y) };
              
                e.diagram.commandHandler.showContextMenu(button);}
            }},
            this.$(go.Picture, {width: 20, height: 17,source:Corbeille,alignment:go.Spot.TopRight,background:"#424242" }),
            )
            ,

            this.$("ContextMenuButton",
            this.$(go.TextBlock, "Index",{margin:new go.Margin(0,25,0,3)}),
            {  click: function(e, button) {
             changeColor(diagram,"ytjh",Corbeille,button.part) 
            }},
            this.$(go.Picture, {width: 20, height: 17,source:Corbeille,alignment:go.Spot.TopRight,background:"#424242" }),
            ),

            this.$("ContextMenuButton",
            this.$(go.TextBlock, "New Index...",{margin:new go.Margin(0,25,0,3)}),
            {  click: function(e, button) {
             changeColor(diagram,"ytjh",Corbeille,button.part) 
            }},
            this.$(go.Picture, {width: 20, height: 17,source:Corbeille,alignment:go.Spot.TopRight,background:"#424242" }),
            )
            ,

            this.$("ContextMenuButton",
            this.$(go.TextBlock, "Create primary key",{margin:new go.Margin(0,25,0,3)}),
            {  click: function(e, button) {
              diagram.startTransaction("change type");
     
              // ignore any selected Links and simple Parts
               // Examine and modify the data, not the Node directly.
               var data = button.part?.data;
               // Call setDataProperty to support undo/redo as well as
               // automatically evaluating any relevant bindings.
               diagram.model.setDataProperty(data, "isPrimarykey",true );
            }},
            this.$(go.Picture, {width: 20, height: 17,source:Corbeille,alignment:go.Spot.TopRight,background:"#424242" }),
            ),

            this.$("ContextMenuButton",
            this.$(go.TextBlock, "Invisible",{margin:new go.Margin(0,25,0,3)}),
            {  click: function(e, button) {
              diagram.startTransaction("change type");
     
              // ignore any selected Links and simple Parts
               // Examine and modify the data, not the Node directly.
               var data = button.part?.data;
               // Call setDataProperty to support undo/redo as well as
               // automatically evaluating any relevant bindings.
               diagram.model.setDataProperty(data, "isInvisible",true );
               
            }},
            this.$(go.Picture, {width: 20, height: 17,source:Corbeille,alignment:go.Spot.TopRight,background:"#424242" }),
            )
            ,

            this.$("ContextMenuButton",
            this.$(go.TextBlock, "Unique",{margin:new go.Margin(0,25,0,3)}),
            {  click: function(e, button) {
              diagram.startTransaction("change type");
     
              // ignore any selected Links and simple Parts
               // Examine and modify the data, not the Node directly.
               var data = button.part?.data;
               // Call setDataProperty to support undo/redo as well as
               // automatically evaluating any relevant bindings.
               diagram.model.setDataProperty(data, "isUnique",true );
            }},
            this.$(go.Picture, {width: 20, height: 17,source:Corbeille,alignment:go.Spot.TopRight,background:"#424242" }),
            ),
            this.$("ContextMenuButton",
            this.$(go.TextBlock, "Never Null",{margin:new go.Margin(0,25,0,3)}),
            {  click: function(e, button) {
              diagram.startTransaction("change type");
     
              // ignore any selected Links and simple Parts
               // Examine and modify the data, not the Node directly.
               var data = button.part?.data;
               // Call setDataProperty to support undo/redo as well as
               // automatically evaluating any relevant bindings.
               diagram.model.setDataProperty(data, "isNeverNull",true );
            }},
            this.$(go.Picture, {width: 20, height: 17,source:Corbeille,alignment:go.Spot.TopRight,background:"#424242" }),
            )
            );                           
    
        var fieldTemplate =
                    this.$(go.Panel, "TableRow",// this Panel is a row in the containing Tabl   // this Panel is a "port"
                             { 
                               background: "transparent", // so this port's background can be picked by the mouse
                               fromSpot: go.Spot.LeftRightSides,  // links only go from the right side to the left side
                               toSpot: go.Spot.LeftRightSides,
                               
                               // allow drawing links from or to this port:
                              
                                
                             // allow the user to select items -- the background color indicates whether "selected"
                              //?? maybe this should be more sophisticated than simple toggling of selection
                              click: function(e, item) {
                                // assume "transparent" means not "selected", for items
                               if(item.diagram!==null)
                               { var oldskips = item.diagram.skipsUndoManager;
                                
                               item.diagram.skipsUndoManager = true ;
                                if (item.background === "transparent") {
                                  item.background = "dodgerblue"; onselectField(item) ;
                                } else {
                                  item.background = "transparent";  onunselectField() ;
                                }
                                item.diagram.skipsUndoManager = oldskips;} 
                              }
                            }, this.$(go.TextBlock,
                              {
                                editable: true,
                                 isMultiline:false,
                                 row:0,column:0, // leave room for Button
                                 font: "bold 13px sans-serif",
                                 stroke: "white",
                                 height:20,
                                  alignment: go.Spot.TopLeft,
                                  margin:new go.Margin(8,0,0,11)//margin:new go.Margin(4,  140,0,0),
                              },
                              new go.Binding("text", "name"),
                              ),
                              
                                
                             
                              this.$(go.Panel, "Horizontal",{alignment: go.Spot.TopRight,row:0,margin:new go.Margin(4,15,0,150),
                              },    
                              this.$("Button",
                              {  row:0,margin:new go.Margin(-3,-4,0,0),
                                column:1,alignment:go.Spot.TopRight,
                                 "ButtonBorder.fill": '#3D3C3A',
                                 "ButtonBorder.stroke": '#3D3C3A',
                                 "_buttonFillOver": '#3D3C3A',
                                 "_buttonStrokeOver": '#3D3C3A',
                                 "_buttonFillPressed": '#3A8EE6',
                                 "_buttonStrokePressed": '#3A8EE6',
                               click: function(e, button) {
                                 if(button.part!==null) 
                                var node_items= button.part.data.items;
                                if(node_items!==null){
                                   diagram.startTransaction();
                                   diagram.model.removeArrayItem( node_items);
                                   diagram.commitTransaction("deleted node");

                                          } 
                             }},
             // the button content can be anything -- it doesn't have to be a TextBlock
                             this.$(go.Picture, {width: 20, height: 22,source:Corbeille, }, ),
                   ),
                                this.$("Button",{contextMenu:fieldcontext,},
                                {  alignment:go.Spot.TopRight,
                                  column:2,row:0,
                                  
                                   "ButtonBorder.fill": '#3D3C3A',
                                   "ButtonBorder.stroke": '#3D3C3A',
                                   "_buttonFillOver": '#3D3C3A',
                                   "_buttonStrokeOver": '#3D3C3A',
                                   "_buttonFillPressed": '#3A8EE6',
                                   "_buttonStrokePressed": '#3A8EE6',  
                                    click:function(e:any, obj:any)
                                   {  var node = obj.part;
                                    if(node!==null)
                                      {var button_coordinates=obj.getDocumentPoint(go.Spot.BottomCenter);
                                      diagram.toolManager.contextMenuTool.positionContextMenu = function(contextMenu, obj) {
                                        var b = contextMenu.measuredBounds;
                                        
                                        contextMenu.position =new go.Point(button_coordinates.x-10,button_coordinates.y) };
                                    
                                      e.diagram.commandHandler.showContextMenu(obj);}},
                                     },                         
                 // the button content can be anything -- it doesn't have to be a TextBlock
                                  this.$(go.Picture, {width: 20, height: 17,source:menu  }),
                                  ),
                                  this.$(go.Shape, "LineV",
                                  {fill: '#c4c4c4', stroke: "#c4c4c4", strokeWidth: 3, width: 7, height:19 ,margin:new go.Margin(0,0,3,0)},),
                     this.$("Button",{contextMenu:nodcontext,},
                              {   
                                alignment:go.Spot.TopRight,
                                column:3,row:0,
                                 "ButtonBorder.fill": '#3D3C3A',
                                 "ButtonBorder.stroke": '#3D3C3A',
                                 "_buttonFillOver": '#3D3C3A',
                                 "_buttonStrokeOver": '#3D3C3A',
                                 "_buttonFillPressed": '#3A8EE6',
                                 "_buttonStrokePressed": '#3A8EE6',  
                                  click:function(e:any, obj:any)
                                 {  var node = obj.part;
                                  if(node!==null)
                                    {var button_coordinates=obj.getDocumentPoint(go.Spot.BottomCenter);
                                    diagram.toolManager.contextMenuTool.positionContextMenu = function(contextMenu, obj) {
                                      var b = contextMenu.measuredBounds;
                                      
                                      contextMenu.position =new go.Point(button_coordinates.x-10,button_coordinates.y) };
                                      
                                    e.diagram.commandHandler.showContextMenu(obj);}},
                                   },                         
               // the button content can be anything -- it doesn't have to be a TextBlock
                                this.$(go.Picture, {width: 20, height: 17,  }
                                  ,
                                new go.Binding("source", "source"),),
                                
                                ),),
                )

                            
                 
      this.diagram.nodeTemplate =
                    
      this.$(go.Node,
         // don't bother with any selection adornme
        {    selectionChanged: onSelectionChanged },
                                       "Auto",  // the whole node panel
                                       { selectionAdorned: false,
                                         resizable: true,movable: true,
                                         layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
                                         fromSpot: go.Spot.Right,  // port properties go on the port!
                                         toSpot: go.Spot.Left,
                                         defaultStretch: go.GraphObject.Horizontal,
                                         isShadowed: false, 
                                        },

                                       new go.Binding("location", "location").makeTwoWay(),
                       // whenever the PanelExpanderButton changes the visible property of the "LIST" panel,
                      // clear out any desiredSize set by the ResizingTool.
                                       new go.Binding("desiredSize", "visible", function(v) { return new go.Size(160, 160); }).ofObject("TABLE"),
                      // define the node's outer shape, which will surround the Table
                    this.$(go.Shape, "RoundedRectangle",
                         {fill: '#454545', stroke: "#454545",minSize:new Size(60,0), strokeWidth: 3, fromLinkable: true, toLinkable: true, fromLinkableSelfNode: true, toLinkableSelfNode: true},  
                         new go.Binding("portId", "key") 
                         ),
                    this.$(go.Panel, "Table",
                         {  alignment: go.Spot.Top,stretch: go.GraphObject.Fill,margin:new go.Margin(5,5,5,5), },  
                        this. $(go.RowColumnDefinition, { row: 0, sizing: go.RowColumnDefinition.None }),
   
           // the table header
                    this.$(go.TextBlock,
                         {
                            margin:new go.Margin(5,0,0,10),
                            row:0,column:0, // leave room for Button
                            font: "bold 16px sans-serif",stroke: "white",
                            height:20,
                            alignment: go.Spot.TopLeft,
                         },
                         new go.Binding("text", "key"),
                         ),
                         this.$(go.Panel, "Horizontal",{alignment: go.Spot.TopRight,row:0,margin:new go.Margin(4,15,0,-150),},    
                     this.$("Button",{contextMenu:nodecontext},
                         {   alignment:go.Spot.TopRight,
                             column:2,row:0,
                            "ButtonBorder.fill": '#454545',
                            "ButtonBorder.stroke": '#454545',
                            "_buttonFillOver": '#454545',
                            "_buttonStrokeOver": '#454545',
                            "_buttonFillPressed": '#3A8EE6',
                            "_buttonStrokePressed": '#3A8EE6',  
                             click:function(e:any, obj:any)
                            {  var node = obj.part;
                               if(node!==null)
                               { 
                                 var button_coordinates=obj.getDocumentPoint(go.Spot.BottomCenter);
                                 diagram.toolManager.contextMenuTool.positionContextMenu = function(contextMenu: { measuredBounds: any; position: go.Point; }, obj: any) {
                                 var b = contextMenu.measuredBounds;
                                 contextMenu.position =new go.Point(button_coordinates.x-10,button_coordinates.y) };

                              }
                              e.diagram.commandHandler.showContextMenu(obj);}, },                         
          // the button content can be anything -- it doesn't have to be a TextBlock
                           this.$(go.Picture, {width: 20, height: 17,source:menu,  }),
                           ),
                           
          this.$("Button",
                           {  row:0,
                              column:1,margin:new go.Margin(-3,-4,0,0),
                              "ButtonBorder.fill": '#454545',
                              "ButtonBorder.stroke": '#454545',
                              "_buttonFillOver": '#454545',
                              "_buttonStrokeOver": '#454545',
                              "_buttonFillPressed": '#3A8EE6',
                              "_buttonStrokePressed": '#3A8EE6',
                            click: function(e, button) { 
                                   if(button.part!==null)
                                     {var node =diagram.findNodeForKey(button.part.data.key);
                                      if (node !== null) {
                                        diagram.startTransaction();
                                        diagram.remove(node);
                                        diagram.commitTransaction("deleted node");
                                       } 
                          }}},
          // the button content can be anything -- it doesn't have to be a TextBlock
                          this.$(go.Picture, {width: 20, height: 22,source:Corbeille, }, ),
                ),
                /*this.$("PanelExpanderButton", "LIST",  // the name of the element whose visibility this button toggles
              { row: 0, alignment: go.Spot.TopRight }),*/),
      // the collapse/expand button
   //   $("PanelExpanderButton", "LIST",  // the name of the element whose visibility this button toggles  
      // the list of Panels, each showing an attribute
          this.$(go.Panel, "Table",
                            { name: "TABLE",
                              defaultRowSeparatorStroke: "#c4c4c4",
                              row:  1,
                              background:"#3D3C3A",
                              itemTemplate: fieldTemplate,
                              stretch: go.GraphObject.Fill,
                              defaultAlignment: go.Spot.TopLeft,
                             /*  contextMenu:  this.$("ContextMenu",
                             makeButton("Paste",
                                function(e:any, obj:any) { e.diagram.commandHandler.pasteSelection(e.diagram.toolManager.contextMenuTool.mouseDownPoint); },
                                function(o:any) { return o.diagram.commandHandler.canPasteSelection(o.diagram.toolManager.contextMenuTool.mouseDownPoint); }),),
                                                        */ },
                           new go.Binding("itemArray", "items") 
                    )
                    )  // end Table Panel
                    ) 
     this.diagram.linkTemplate =
                          this.$(go.Link,{selectionChanged:onSelectionChanged2}, // the whole link panel
                                           {relinkableFrom: true, relinkableTo: true, // let user reconnect links
                                            toShortLength: 4, 
                                            fromShortLength: 2,
                                            selectionAdorned: true,
                                            selectable:true,
                                            reshapable: true,routing: go.Link.Orthogonal&& go.Link.AvoidsNodes, 
                                           
                                            corner: 5,
                                            curve: go.Link.JumpOver,
                                            selectionAdornmentTemplate:
       this.$(go.Adornment, "Spot",
          
            // this Adornment has a rectangular blue Shape around the selected node
            this.$(go.Shape, { isPanelMain: true, stroke: "dodgerblue", strokeWidth: 3 }),
            
          
          // and this Adornment has a Button to the right of the selected node
          this.$("Button",
                          { alignment: go.Spot.Right, alignmentFocus: go.Spot.Left,
                            click: function(e: any, obj:  any ){
                              var link = obj.part.adornedPart;
                              if(link!==null)
                               { diagram.startTransaction("remove link");
                                diagram.remove(link);
                                diagram.commitTransaction("remove link"); }} },  // define click behavior for Button in Adornment
                          this.$(go.TextBlock, "Delete",  // the Button content
                            { font: "bold 6pt sans-serif" })
                        ),
        )  // end Adornment
    },
                                          
                                         
                          this.$(go.Shape) ,
                       
                          
                          this.$(go.Picture, {width: 15, height: 15,source:one, segmentIndex: 0.1, 
                            segmentFraction: 0.5 }, ),
                           

                          
                            this.$(go.Picture, 
                            { segmentIndex: -1, segmentFraction: 0.5, width: 15, height: 15,source:zero, })
                        );
    
                        
   return diagram;};
   actualcomponent:string="";         
   /*r=(new)=>{ 
        if(this.actualcomponent!==new)
         {this.actualcomponent=new}}; */
    }; 

    const initialState:undefined |InitialDiagramComponents=new InitialDiagramComponents;
   
    const DiagramReducer=(Istate=initialState,action:AnyAction|undefined):any=>
    {
    if(action!==undefined)
          {switch (action.type) {
                 case 'ADDTABLE':return {...Istate,Istate:Istate.diagram.model.addNodeData({key:"New Table",items:[{name:"new field",type:"gju",source:one,isPrimarykey:false,isInvisible:false,isUnique:false,isNeverNull:false}]}) }; 
                // case 'CHANGECOMPONENT':return {...Istate,Istate:Istate.component}
                 default:return Istate;
                  };
           }
    }
    export default DiagramReducer;


