ui.layoutCombo = ui.switcherCombo.extendOptions({
    width: "100%", margin: 0,
    label: "Layout"
});

ui.layoutCombo.column = ui.panel.extendOptions({
    label: "Columns",
    items: function () {
        return [
            ui.combo({
                panelClass: 'only-icons',
                items: function(){
                    var items = [];
                    for (var i=1;i<=12;i++) {
                        items.push({value:i,label:i});
                    }
                    items.push({value:false,label:"auto",default:true});
                    return items;
                },
                name: "column",
                inline: true, width: '100%', height: '100%', margin: 0,
                itemTpl: function(item) {
                    return $("<div class='combo-item'>").append(
                        $("<div class='combo-icon' style='width:18px;height:35px;'>").append(
                            $("<span class='combo-label'>").text(item.label)
                        )
                    );
                }                
            })
        ];
    }
}).extend({
    showGrid: function(flag) {
        if (!this.gridHandle) {
            this.gridHandle = $("<div>").css({
                position: 'absolute',
                left: '50%', top: 0, bottom: 0,
                background: 'transparent',
                zIndex: 100500
            })
                .appendTo(Component.previewFrame.handleContainer)
            
            var m = 2;
            var w = (100-m*11)/12;
            var curr = 0;
            
            for (var i=0;i<12;i++) {
                this.gridHandle.append(
                    $("<div>").css({
                        background: 'rgba(0,0,255,0.1)',
                        position: 'absolute',
                        top: 0, bottom: 0, 
                        left: curr+"%", width:w+"%"
                    })
                );
               curr += w + m;
            }
        }
        
        if (flag) {
            var theme = Component.app.settings.theme;
            var sheetWidth = parseFloat(theme.sheet.width);

            this.gridHandle.show().css({
                marginLeft: -sheetWidth/2,
                width: sheetWidth
            });
        } else {
            this.gridHandle.hide();
        }
    }
},{
    init: function (o) {
        this._super(o);
        
        var me = this;
        this.element
            .mouseover(function(){ me.Class.showGrid(true) })
            .mouseout(function(){ me.Class.showGrid(false) })
    }
})

ui.layoutCombo.part = ui.panel.extendOptions({
    items: [
        {value:'of', label: '1/4'},
        {value:'ot', label: '1/3'},
        {value:'oh', label: '1/2'},
        {value:'tt', label: '2/3'},
        {value:'tf', label: '3/4'},
        {value:'full', label: 'auto',default: true}
    ],    
    switcherLabel: function (value,parent) {
        var res = "Full Width";
        $.each(this.items,function(){
            if (value && this.value==value.part) res = this.label;
        });
        return res;
    }
},{
    label: "Part Of",
    items: function() {
        var me = this;
        return [
            ui.combo({
                label:"Part Of",
                panelClass: 'only-icons',
                items: function(){return me.Class.items},
                name: "part",
                inline: true, width: '100%', height: '100%', margin: 0,
                itemTpl: function(item) {
                    return $("<div class='combo-item'>").append(
                        $("<div class='combo-icon' style='width:50px;height:35px;'>").append(
                            $("<span class='combo-label'>").text(item.label)
                        )
                    );
                }
            })
        ];
    }
});

ui.xyCombo = ui.lengthCombo.extendOptions({
    options:[{label:'auto',value:false}], icons: {}
});

ui.layoutCombo.absolute = ui.panel.extendOptions({
    label: "Absolute",
    layout: { width: "23%", margin: "10px 0px 0 5px" },
    items: function () {
        ui.xyCombo({name:"width",label:"W"});
        ui.xyCombo({name:"position.x",label:"X"});
        ui.xyCombo({name:"position.y",label:"Y"});
        ui.xyCombo({name:"position.z",label:"Z",units:false});
    }
});

ui.layoutCombo.centered = ui.composite.extendOptions({
    label: "Centered", padding: 10,
    items: [
        "This item will be centered in it's container"
    ]
});