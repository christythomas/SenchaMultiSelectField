/**
* Plugin to popup options when typing in a text area field. 
*/
Ext.define('Ux.plugin.InputSelector', {
    extend: 'Ext.Component',
    alias: 'plugin.inputselector',
	requires: ['Ext.dataview.List', 'Ext.form.FieldSet'],
    config: {
		store: null, 
		delimiter: '; ',
		textarea: null,
		listpanel: null
	},
	
	init: function(textarea) {
		this.setTextarea(textarea);
		textarea.getComponent().on('keyup', this.onKeyup, this);
    },
	
	getOptionPicker: function(appendString) {
        var listPanel = this.getListpanel();

        if (Ext.isEmpty(listPanel)) {
            listPanel = Ext.create('Ext.Panel', {
                modal: true,
                cls: Ext.baseCSSPrefix + 'select-overlay',
                layout: 'fit',
                hideOnMaskTap: true,
                width: '12em',
                height: '14.75em',
                items: [{
					xtype: 'toolbar',
					title: this.getTextarea().getLabel(),
					docked: 'top'
				},{
                    xtype: 'list',
					store: this.getStore(),
					itemTpl: '{name}'
                }]
            });

            listPanel.down('list').on('itemtap', this.onListTap, this,
				{"appendString": appendString});
			this.setListpanel(listPanel);
        }
        return listPanel;
    },
	
	onListTap: function(list, index, target, record, e, eOpts){
		var textarea = this.getTextarea(),
			appendString = eOpts.appendString,
			name = record.get('name');
		if( Ext.isEmpty( appendString )){
			textarea.setValue(name + this.getDelimiter());
		} else{
			textarea.setValue(appendString + this.getDelimiter() + 
				name + this.getDelimiter() );
		}
		// There is a bug with this on Mobile Safari
		// http://stackoverflow.com/questions/2398528/set-textbox-focus-in-mobile-safari
		textarea.focus();
		list.up('panel').destroy();
		this.setListpanel(null);
		// remove the record so it can't be added again
		this.getStore().remove(record);
		// move the cursor to the end of the field
		var el = document.getElementById(textarea.getId()),
				textel = el.getElementsByTagName('textarea')[0],
				length = textarea.getValue().length;
		textel.setSelectionRange(length, length);
	},
	
	onKeyup: function(e, eOps){
		var textarea = this.getTextarea(),
			filterString = null,
			value = textarea.getValue(),
			lastDelim = value.lastIndexOf(this.getDelimiter().trim());
			appendString = null;
			
        if (textarea.getReadOnly()) {
            return;
        }

		// obtain the part after the delimiter
		if( lastDelim > 0 ){
			filterString = value.substring( lastDelim+1 ).trim();
			appendString = value.substring( 0, lastDelim );
		}else if( lastDelim === -1 ){
			filterString = value;
		}

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
				}
				listPanel.showBy(textarea);
			} else{
				if(this.getListpanel()){
					this.getListpanel().destroy();
					this.setListpanel(null);
				}
			}
		} else{
			if(this.getListpanel()){
				this.getListpanel().destroy();
				this.setListpanel(null);
			}
		}
	}
});