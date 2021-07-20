import go, { CommandHandler, List, Margin, Model, Panel, Part, Size, TextBlock } from "gojs";
import { AnyAction } from "redux";
import Corbeille from '../icons/icons8-trash-50.png';
import menu from '../icons/icons8-menu-vertical-100.png';
import zero from '../icons/nombre0.png'
import one from '../icons/nombre1.png'
import n from '../icons/N_im.png'
import A from '../icons/Alpha.png'
import T from '../icons/Text.png'
import date from '../icons/Date.png'
import time from '../icons/Time.png'
import picture from '../icons/picture.png'
import bol from '../icons/boolean.png'
import brack from '../icons/brack.png'
import blob from '../icons/diagram.png'
import num from '../icons/number.png'




import diagram from '../diagram.json'



  export class InitialDiagramComponents{
    $=go.GraphObject.make;
    nodeDataArray=[]
    linkDataArray=[];
    model=go.GraphObject.make(go.GraphLinksModel,
              { //nodeKeyProperty: "key",
              copiesArrays: true,
              copiesArrayObjects: true,
            
              nodeDataArray: this.nodeDataArray,
              linkDataArray:this.linkDataArray});
    diagram=this.$(go.Diagram, 
             {allowDelete: true,
              allowCopy: true,
              layout: go.GraphObject.make(go.ForceDirectedLayout),
              "undoManager.isEnabled": true,
              "contextMenuTool.isEnabled": true,
              "LinkDrawn": function (e: any) {
                var link = e.subject;
                var fnode = link.fromNode.part;
                var arr = fnode.data.items;
                var cardinality=""
                if(link.findObject("from").source===one) {cardinality="1-N"}
                else {{cardinality="0-N"}}
               if (fnode !== null) 
               {e.diagram.startTransaction();
                // node.data.items.type
                fnode.diagram.model.addArrayItem(arr, {name:"foreign key",type:link.toNode.part.data.key,isPrimarykey:false,isInvisible:false,isUnique:false,isNeverNull:false,isindexed:false,source:num});
                e.diagram.commitTransaction("item added");
               } 
               e.diagram.model.setCategoryForLinkData(link.data, cardinality); 
                  },
              "ModelChanged":function(e) {
                    let modell:any=JSON.stringify(diagram)
                    
                    if ((e.change === go.ChangedEvent.Insert || e.change === go.ChangedEvent.Remove) &&!(e.object instanceof go.Model)) {
                       console.log(e.toString()) }
                    if (e.isTransactionFinished) {
                     // show the model data in the page's TextArea
                    if(modell!==null)
                    modell = e.diagram?.model.toJson();

                    }
                    },
             "LinkRelinked": function (e: any) {
              var link = e.subject;
              var fnode = link.fromNode.part;
              var arr = fnode.data.items;
              var cardinality=""
              if(link.findObject("from").source===one) {cardinality="1-N"}
              else {{cardinality="0-N"}}
              
             if (fnode !== null) 
             {e.diagram.startTransaction();
              // node.data.items.type
              fnode.diagram.model.addArrayItem(arr, {name:"foreign key",type:link.toNode.part.data.key,isPrimarykey:false,isInvisible:false,isUnique:false,isNeverNull:false,source:one});
              e.diagram.commitTransaction("item added");
             } 
             e.diagram.model.setCategoryForLinkData(link.data, cardinality); 
                },     
             
             model:this.model });
              maybeChangeLinkCategory=(e: any)=> {
              var link = e.subject;
              var cardinality="0-N"
              e.diagram.model.setCategoryForLinkData(link.data, cardinality);
         } ;
        
    
              
    init=():go.Diagram=>{ 
             let diagram=this.diagram 
             let  maybeChangeLinkCategory=(e: any)=> {
                 var link = e.subject;

                 var cardinality="0-N"
                 e.diagram.model.setCategoryForLinkData(link.data, cardinality);
            } 
    
   
   
           let changeType=(diagram: go.Diagram, type: any,source:any,item:any)=> {
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
             
        
       function findAllSelectedItems() {
        var items = [];
        for (var nit = diagram.nodes; nit.next();) {
          var node = nit.value;
          var table = node.findObject("TABLE");
          if (table) {
            for (var iit = table.part?.elements; iit?.next();) {
              var itempanel = iit.value;
              if (itempanel.background !== "transparent") items.push(itempanel);
            }
          }
        }
        return items;
      }
     

     
     var nodecontext =
                     this.$("ContextMenu", "RoundedRectangle", 
                     this.$("ContextMenuButton",this.$(go.TextBlock, "   Field   ",),
                             { click:function(e:any, button:any) {
                                  if(button.part!== null)
                                   {var node = button.part.adornedObject.panel.panel.part
                                       if (node !== null) {
                                       diagram.startTransaction();
                                       diagram.model.addArrayItem(node.data.items,{name:"new field",type:"Alpha",isPrimarykey:false,isInvisible:false,isUnique:false,isNeverNull:false,isindexed:false,source:A});
                                       diagram.commitTransaction("item added");
                                       }
                                  }
                                  },
                            }),
                     
                     
                            /*this.$("ContextMenuButton",
                                        this.$(go.TextBlock, "   paste  ",),
                                                 { click:function(e:any, button:any) {
                                                  diagram.commandHandler.pasteSelection = function() {
                                                    var itemClipboard =(diagram.commandHandler as any)._itemClipboard;
                                                    var pasteTarget = button.part.adornedPart ;  // assumes a single node is selected, may need to be changed
                                                    if (itemClipboard && itemClipboard.length > 0 && pasteTarget instanceof go.Node) {
                                                          diagram.startTransaction("paste items");
                                                          for (var i = 0; i < itemClipboard.length; i++) {
                                                            var panel = itemClipboard[i];
                                                            var itemdata = panel.data;
                                                            var fields = pasteTarget.data.fields;
                                                            diagram.model.addArrayItem(fields, itemdata);  // add the copied panel's data to the selected node's fields
                                                          }
                                                          diagram.commitTransaction("paste items");
                                                        } else {  // otherwise just paste nodes and/or links, as usual
                                                          go.CommandHandler.prototype.pasteSelection.call(diagram.commandHandler);console.log('nooooo')
                                                        }
                                                      }  },
                                                  }),*/);
      var nodcontext =
                           this.$("ContextMenu", 
                           this.$("ContextMenuButton",
                           this.$(go.TextBlock, "Number",{margin:new go.Margin(0,25,0,3)},),
                               { click:function(e, button) {
                                     changeType(diagram,"Number",num,button.part)                                      
                               }
                              },
                           this.$(go.Picture, {width: 20, height: 17,source:num ,alignment:go.Spot.TopRight,background:"#424242" })
                            ),
                           this.$("ContextMenuButton",
                               this.$(go.TextBlock, "Alpha",{margin:new go.Margin(0,25,0,3)},),
                                   { click:function(e, button) {
                                         changeType(diagram,"Alpha",A,button.part)                                      
                                   }
                                  },
                               this.$(go.Picture, {width: 20, height: 17,source:A ,alignment:go.Spot.TopRight,background:"#424242" })
                                ),
                          
                          this.$("ContextMenuButton",
                               this.$(go.TextBlock, "Text",{margin:new go.Margin(0,25,0,3)}),
                                 {  click: function(e, button) {
                                           changeType(diagram,"Text",T,button.part) 
                                 }
                                 },
                                 this.$(go.Picture, {width: 20, height: 20,source:T,alignment:go.Spot.TopRight,background:"#424242"  }),
                                 ),
                          this.$("ContextMenuButton",
                           this.$(go.TextBlock, "Date",{margin:new go.Margin(0,25,0,3)}),
                                 {  click: function(e, button) {
                                            changeType(diagram,"Date",date,button.part) 
                                 }
                                },
                              this.$(go.Picture, {width: 20, height: 17,source:date,alignment:go.Spot.TopRight,background:"#424242"  }),
                                 )
                                 ,
                          this.$("ContextMenuButton",
                           this.$(go.TextBlock, "Time",{margin:new go.Margin(0,25,0,3)}),
                                 {  click: function(e, button) {
                                  changeType(diagram,"Time",time,button.part) 
                                 }},
                                 this.$(go.Picture, {width: 20, height: 17,source:time,alignment:go.Spot.TopRight,background:"#424242"  }),
                                 )
                                 ,
                          this.$("ContextMenuButton",
                           this.$(go.TextBlock, "Boolean",{margin:new go.Margin(0,25,0,3)}),
                                 {  click: function(e, button) {
                                  changeType(diagram,"Boolean",bol,button.part) 
                                 }},
                                 this.$(go.Picture, {width: 20, height: 17,source:bol,alignment:go.Spot.TopRight,background:"#424242"  }),
                                 )
                                 ,
                          this.$("ContextMenuButton",
                           this.$(go.TextBlock, "Picture",{margin:new go.Margin(0,25,0,3)}),
                                 {  click: function(e, button) {
                                  changeType(diagram,"Picture",picture,button.part) 
                                 }},
                                 this.$(go.Picture, {width: 20, height: 17,source:picture,alignment:go.Spot.TopRight,background:"#424242"  }),
                                 )
                                 ,
                          this.$("ContextMenuButton",
                           this.$(go.TextBlock, "Blob",{margin:new go.Margin(0,25,0,3)}),
                                 {  click: function(e, button) {
                                  changeType(diagram,"Blob",blob,button.part) 
                                 }},
                                 this.$(go.Picture, {width: 20, height: 17,source:blob,alignment:go.Spot.TopRight,background:"#424242"  }),
                                 )
                                 ,
                          this.$("ContextMenuButton",
                           this.$(go.TextBlock, "Object",{margin:new go.Margin(0,25,0,3)}),
                                 {  click: function(e, button) {
                                  changeType(diagram,"Object",brack,button.part) 
                                 }},
                                 this.$(go.Picture, {width: 20, height: 17,source:brack,alignment:go.Spot.TopRight,background:"#424242"  }),
                                 ))
    /*  diagram.commandHandler.pasteSelection = function() {
                              var itemClipboard =(diagram.commandHandler as any)._itemClipboard;
                              var pasteTarget = diagram.selection.first();  // assumes a single node is selected, may need to be changed
                              if (itemClipboard && itemClipboard.length > 0 && pasteTarget instanceof go.Node) {
                                    console.log('yes')
                                    diagram.startTransaction("paste items");
                                    for (var i = 0; i < itemClipboard.length; i++) {
                                      console.log("bhdjhb")
                                      var panel = itemClipboard[i];
                                      var itemdata = panel.data;
                                      var fields = pasteTarget.data.fields;
                                      diagram.model.addArrayItem(fields, itemdata);  // add the copied panel's data to the selected node's fields
                                    }
                                    diagram.commitTransaction("paste items");
                                  } else {  // otherwise just paste nodes and/or links, as usual
                                    go.CommandHandler.prototype.pasteSelection.call(diagram.commandHandler);console.log('Nooooo')
                                  }
                                }  
                                diagram.commandHandler.copySelection = function() {
                                  var items = findAllSelectedItems();
                                  if (items.length > 0) { console.log("fkjkdj");
                                      // if there are any selected items, save them to a clipboard
                                    (diagram.commandHandler as any)._itemClipboard = items;
                                  } else {  // otherwise just copy nodes and/or links, as usual
                                    go.CommandHandler.prototype.copySelection.call(diagram.commandHandler);
                                  }
                                }  */                       
      var fieldcontext=
                       this.$("ContextMenu", 
                            this.$("ContextMenuButton",
                                this.$(go.TextBlock, "Insert Field",{margin:new go.Margin(0,25,0,3)}),
                                     {  click: function(e, button:any) {             
                                           if(button.panel!== null)
                                           {var node =button.part.adornedObject.panel.panel.panel.part 
                                             if (node !== null && node !==undefined) {
                                              diagram.startTransaction();
                                              diagram.model.addArrayItem(node.data.items,{name:"new field",type:"Alpha",isPrimarykey:false,isInvisible:false,isUnique:false,isNeverNull:false,isindexed:false,source:A});
                                              diagram.commitTransaction("item added");
                                             }}},
                                    },
                                   ),
                        /* this.$("ContextMenuButton",
                               this.$(go.TextBlock, "Copy ",{margin:new go.Margin(0,25,0,3)}),
           {  click: function(e, button) { 
            
             if(button.part!==null) 
             { var set = new Iterable<go.Part>();
               let items: [go.Part] = [button.part];
              let m = new Map<go.Part>(b);
              set.add(button.part)
              var it = set.iterator;
              while (it.next()) 
                 // if there are any selected items, save them to a clipboard
                  diagram.commandHandler.copyToClipboard ( it.value );
               }}
            }},   */ 
                             
       

                           this.$("ContextMenuButton",
                                  this.$(go.TextBlock, "Index",{margin:new go.Margin(0,25,0,3)}),
                                      { 
                                        click: function(e, button) {
                                          diagram.startTransaction("index");
                                         // ignore any selected Links and simple Parts
                                         // Examine and modify the data, not the Node directly.
                                          var data = button.part?.data;
                                         // Call setDataProperty to support undo/redo as well as
                                         // automatically evaluating any relevant bindings.
                                          diagram.model.setDataProperty(data, "isindexed",true );
                                      }},
                                 ),

                            this.$("ContextMenuButton",
                                   this.$(go.TextBlock, "Create primary key",{margin:new go.Margin(0,25,0,3)}),
                                      {  click: function(e, button) {
                                          diagram.startTransaction("primary key");
                                         // ignore any selected Links and simple Parts
                                         // Examine and modify the data, not the Node directly.
                                          var data = button.part?.data;
                                         // Call setDataProperty to support undo/redo as well as
                                         // automatically evaluating any relevant bindings.
                                          diagram.model.setDataProperty(data, "isPrimarykey",true );
                                       }},
                                   ),
                              this.$("ContextMenuButton",
                                     this.$(go.TextBlock, "Invisible",{margin:new go.Margin(0,25,0,3)}),
                                         {  click: function(e, button) {
                                              diagram.startTransaction("Invisible");
                                              // ignore any selected Links and simple Parts
                                              // Examine and modify the data, not the Node directly.
                                              var data = button.part?.data;
                                              // Call setDataProperty to support undo/redo as well as
                                              // automatically evaluating any relevant bindings.
                                              diagram.model.setDataProperty(data, "isInvisible",true );
                                          }},
                                    ),

                               this.$("ContextMenuButton",
                                      this.$(go.TextBlock, "Unique",{margin:new go.Margin(0,25,0,3)}),
                                          {  click: function(e, button) {
                                                 diagram.startTransaction("Unique");
                                                  // ignore any selected Links and simple Parts
                                                 // Examine and modify the data, not the Node directly.
                                                 var data = button.part?.data;
                                                // Call setDataProperty to support undo/redo as well as
                                                // automatically evaluating any relevant bindings.
                                                  diagram.model.setDataProperty(data, "isUnique",true );
                                            }},
                                     ),
                              this.$("ContextMenuButton",
                                      this.$(go.TextBlock, "Never Null",{margin:new go.Margin(0,25,0,3)}),
                                        {  click: function(e, button) {
                                               diagram.startTransaction("Never Null");
                                                // ignore any selected Links and simple Parts
                                                // Examine and modify the data, not the Node directly.
                                                var data = button.part?.data;
                                                 // Call setDataProperty to support undo/redo as well as
                                                 // automatically evaluating any relevant bindings.
                                               diagram.model.setDataProperty(data, "isNeverNull",true );
                                         }},
                                    )
            );                           
    
        var fieldTemplate =
                        this.$(go.Panel, "TableRow",// this Panel is a row in the containing Tabl  
                             { 
                               background: "transparent", 
                              click: function(e, item) {
                                const bar=document.getElementById("right_sidebar");
                                const grid=document.getElementById("grid-container");
                                // assume "transparent" means not "selected", for items
                               if(item.diagram!==null)
                               { var oldskips = item.diagram.skipsUndoManager;
                                 item.diagram.skipsUndoManager = true ;
                                if (item.background === "transparent") {
                                  item.background = "dodgerblue";
                                

                                  if(bar!==null && grid!==null){

                                      bar.style.width = "250px";  
                                  } 

                                } else {
                                  if(bar!==null && grid!==null){
                                  item.background = "transparent"; 
                                  bar.style.width = "0px" ;global.r=""
                                }}
                                item.diagram.skipsUndoManager = oldskips;} 
                              }
                            }, this.$(go.TextBlock,
                              { 
                                 editable:true,
                                 isMultiline:false,
                                 row:0,column:0,
                                 font: "bold 13px sans-serif",
                                 stroke: "white",
                                 height:20,
                                  alignment: go.Spot.TopLeft,
                                  margin:new go.Margin(8,0,0,11),
                                 
                              },
                              new go.Binding("text", "name").makeTwoWay(),
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
                                this.$(go.Picture, {width: 20, height: 17,  }
                                  ,
                                new go.Binding("source", "source"),),
                                
                                ),),
                )

                            
    
      this.diagram.nodeTemplate =
                                   this.$(go.Node,
         // don't bother with any selection adornment 
                                           { selectionChanged: function name(node: any) {
                                               const bar=document.getElementById("right_sidebar");
                                               const grid=document.getElementById("grid-container");
    
                                                 if(bar!==null && grid!==null){
                                                  if (node.isSelected){
                                                      bar.style.width = "250px"; 
                                                   }
                                                 else
                                                   {
                                                     bar.style.width = "0";  
                                                    } }} },
                                       "Auto",  // the whole node panel
                                              { selectionAdorned: false,
                                                resizable: true,movable: true,
                                                layoutConditions: go.Part.LayoutStandard & ~go.Part.LayoutNodeSized,
                                                fromSpot: go.Spot.AllSides,  // port properties go on the port!
                                                toSpot: go.Spot.AllSides,
                                                defaultStretch: go.GraphObject.Horizontal,
                                                isShadowed: false, 
                                              },

                                               new go.Binding("location", "location").makeTwoWay(),
                       
                                               new go.Binding("desiredSize", "visible", function(v) { return new go.Size(250, NaN); }).ofObject("TABLE"),
                                               this.$(go.Shape, "RoundedRectangle",
                                                     {fill: '#454545', stroke: "#454545",minSize:new Size(60,0), strokeWidth: 3, fromLinkable: true, toLinkable: true, fromLinkableSelfNode: true, toLinkableSelfNode: true},  
                                                      new go.Binding("portId", "key") 
                                                    ),
                        
                                              this.$(go.Panel, "Table",
                                                      {  alignment: go.Spot.Top,stretch: go.GraphObject.Fill,margin:new go.Margin(5,5,5,5), },  
                                              this. $(go.RowColumnDefinition, { row: 0, sizing: go.RowColumnDefinition.None }),
   
                                              this.$(go.TextBlock,
                                                      { editable:true,
                                                       margin:new go.Margin(5,0,0,10),
                                                       row:0,column:0, // leave room for Button
                                                       font: "bold 16px sans-serif",stroke: "white",
                                                       height:20,
                                                       alignment: go.Spot.TopLeft,
                                                       textEdited: function(tb:any, olds:any, news:any) {
                                                        var data= tb.part.data;
                                                        diagram.model.setDataProperty(data, "key",news );
                        
                                                      },
                                                      },
                                                      new go.Binding("text", "key"),
                                                     ),
                                               this.$(go.Panel, "Horizontal",{alignment: go.Spot.TopRight,row:0,margin:new go.Margin(4,15,0,-180),},    
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
                                                                 contextMenu.position =new go.Point(button_coordinates.x-10,button_coordinates.y) }
                                                             }
                                                             e.diagram.commandHandler.showContextMenu(obj);}, },                         
                                              this.$(go.Picture, {width: 20, height: 17,source:menu,  }),
                                                   ),
                                            this.$("Button",
                                                    {  row:0,
                                                       column:1,margin:new go.Margin(-3,6,0,0),
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
                                           this.$(go.Picture, {width: 20, height: 22,source:Corbeille, }, ),
                                                 ),
                this.$("PanelExpanderButton","TABLE",  // the name of the element whose visibility this button toggles
              { column:3,row:0, "ButtonBorder.fill": 'white',
              "ButtonBorder.stroke": '#454545',
              "_buttonFillOver": '#454545',
              "_buttonStrokeOver": '#454545',
              "_buttonFillPressed": '#3A8EE6',
              "_buttonStrokePressed": '#3A8EE6', }),),
      // the collapse/expand button
  
                                            this.$(go.Panel, "Table",
                                                 { name: "TABLE",
                                                 defaultRowSeparatorStroke: "#c4c4c4",
                                                 row:  1,
                                                 background:"#3D3C3A",
                                                 itemTemplate: fieldTemplate,
                                                 stretch: go.GraphObject.Fill,
                                                 defaultAlignment: go.Spot.TopLeft,
                          },
                                            new go.Binding("itemArray", "items") 
                                                 )
                    )  // end Table Panel
                    ) 
     this.diagram.linkTemplate =
                               this.$(go.Link,{selectionChanged:
                                     function name(link:any) {
                                              const bar=document.getElementById("right_sidebar");
                                              const grid=document.getElementById("grid-container");
                                                if(bar!==null && grid!==null){
                                                     if (link.isSelected){
                                                        globalThis.r ="link"
                                                     bar.style.width = "250px";}
    
                                                 else
                                                 {
                                                  global.r =""
                                                  bar.style.width = "0";
                                                  }}
                                                    }}, // the whole link panel
                                                     { // let user reconnect links
                                                        toShortLength: 4, relinkableFrom:true,relinkableTo:true,
                                                        fromShortLength: 2,fromSpot: go.Spot.AllSides
                                                        , toSpot: go.Spot.AllSides,
                                                        selectionAdorned: true,
                                                        selectable:true,
                                                        reshapable: true,
                                                        routing: go.Link.Orthogonal&& go.Link.AvoidsNodes, 
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
                                                                                                              var fnode = link.fromNode;
                                                                                                              var arr = fnode.data.items; 
                                                                                                              var foreign:any[]=new Array()
                                                                                                              for (var i = arr.length - 1; i >= 0; --i) 
                                                                                                              {
                                                                                                              if(arr[i].type==link.toNode.data.key)
                                                                                                              {foreign.push(arr[i])
                                                                                                              }}
                                                                                                               if(link!==null)
                                                                                                                 { diagram.startTransaction("remove foreign key");
                                                                                                                   diagram.model.removeArrayItem(foreign);
                                                                                                                   diagram.remove(link);
                                                                                                                   diagram.commitTransaction("remove foreign key");

                                                                                                                  
                                                                                                                  foreign[0]=null }} },  // define click behavior for Button in Adornment
                                                                                 this.$(go.TextBlock, "Delete",  // the Button content
                                                                                                 { font: "bold 6pt sans-serif" })
                                                                          ),
                                                                          )  // end Adornment
                            }, 
                                          
                                         
                                                                                  this.$(go.Shape) ,
                                                                                                   this.$("Button",{
                                                                                                                    "ButtonBorder.figure": "Circle",
                                                                                                                      segmentIndex: 0.1, 
                                                                                                                      segmentFraction: 0.5,
                                                                                                                      click: function(e: any, button:  any ){
                                                                                                                          var cardinality=""
                                                                                                                          var from=button.findObject("from").source;
                                                                                                                          if(button.findObject("from").source===one)
                                                                                                                           {button.findObject("from").source=zero;cardinality="0-N"}
                                                                                                                          else 
                                                                                                                          {button.findObject("from").source=one; cardinality="1-N" }
                                                                                                                          e.diagram.model.setCategoryForLinkData(button.part.data, cardinality); 
                             
                            
                            },},
                                                                                                                  this.$(go.Picture, 
                                                                                                                              {width: 15,  height: 15,  name:"from",source:zero, 
                             
                          },
                              ),),
                              this.$(go.Shape, { toArrow: "BackwardTriangle" }),
                              
                                                                                                               this.$("Button",{segmentIndex: -1, segmentFraction: 0.5,width: 20, height: 20},
                                                                                                                                           this.$(go.Picture, 
                                                                                                                                                    {  width: 27, height: 27,source:n,name:"to", margin:new go.Margin(0,0,0,-4)})
                        ),)
    
                        
   return diagram;
  };
           

    }; 

    const initialState:undefined |InitialDiagramComponents=new InitialDiagramComponents;
   
    const DiagramReducer=(Istate=initialState,action:AnyAction|undefined):any=>
    {
    if(action!==undefined)
          {switch (action.type) {
                 case 'ADDTABLE':return {...Istate,Istate:Istate.diagram.model.addNodeData({key:"New Table",items:[]}) }; 
                 default:return Istate;
                  };
           }
    }
    export default DiagramReducer;


