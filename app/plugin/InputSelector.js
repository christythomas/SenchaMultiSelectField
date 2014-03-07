
Ext.define('Ux.plugin.InputSelector', {
    extend: 'Ext.Component',
    alias: 'plugin.inputselector',
	requires: ['Ext.dataview.List', 'Ext.form.FieldSet'],
    config: {
		store: null, 
		delimiter: '; ',
		textarea: null,
		listPanel: null
	},
	
	init: function(textarea) {
		this.setTextarea(textarea);
		textarea.on('keyup', this.onKeyup, this);
    },
	
	getOptionPicker: function(appendString) {
        var listPanel = this.getListPanel();

        if (Ext.isEmpty(listPanel)) {
            listPanel = Ext.create('Ext.Panel', {
                left: 0,
                top: 0,
                modal: true,
                cls: Ext.baseCSSPrefix + 'select-overlay',
                layout: 'fit',
                hideOnMaskTap: true,
                width: '18em',
                height: '12em',
                items: [{
                    xtype: 'list',
					store: this.getStore(),
                    itemTpl: '<span class="x-list-label">{name:htmlEncode}</span>'
                }]
            });

            listPanel.down('list').on('itemtap', this.onListTap, this, {"appendString": appendString});
			this.setListPanel(listPanel);
        }
        return listPanel;
    },
	
	onListTap: function(list, index, target, record, e, eOpts){
		var textarea = this.getTextarea(),
			appendString = eOpts.appendString,
			name = record.get('name');
		console.debug("onListTap " + appendString );
		if( Ext.isEmpty( appendString )){
			textarea.setValue(name + this.getDelimiter());
		} else{
			textarea.setValue(appendString + this.getDelimiter() + name + this.getDelimiter() );
		}
		list.up('panel').destroy();
		this.setListPanel(null);
	},
	
	onKeyup: function(e, eOps){
		var textarea = this.getTextarea(),
			filterString = null,
			value = textarea.getValue(),
			lastDelim = value.lastIndexOf(this.getDelimiter());
			appendString = null;
		console.debug( "text value " + textarea.getValue());
			
        if (textarea.getReadOnly()) {
            return;
        }

        textarea.isFocused = true;
		// obtain the part after the delimiter
		if( lastDelim > 0 ){
			filterString = value.substring( lastDelim+1 ).trim();
			appendString = value.substring( 0, lastDelim );
		}else if( lastDelim === -1 ){
			filterString = value;
		}
		console.debug( "last Delim " + lastDelim + " filter " + filterString + " appendString " + appendString );

		if( !Ext.isEmpty( filterString )){
			var store = this.getStore();
			store.clearFilter();
			store.filterBy( function( rec, id) {
				var name = rec.get("name") || " ";
				name = name.toLowerCase();
				return (name.indexOf(filterString.toLowerCase()) != -1);
			});
			if( store.getCount() > 0 ){
				var listPanel = this.getOptionPicker(appendString);
				if (!listPanel.getParent()) {
					Ext.Viewport.add(listPanel);
					listPanel.showBy(textarea, "tc-bc?");
				}
			} else{
				if(this.getListPanel()){
					this.getListPanel().destroy();
					this.setListPanel(null);
				}
			}
		}
	}
});