//<debug>
// This needs to be set to false if you want to set breakpoints that stick b/w refreshes
	Ext.Loader.setConfig({
		disableCaching: false,
	});
//</debug>

/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'Ux',

    requires: [
        'Ext.MessageBox',
		'Ext.data.Store',
		'Ext.form.Panel',
		'Ux.plugin.InputSelector'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

		var store = Ext.create('Ext.data.Store', {
			storeId: 'optionstore',
			fields: ['name'],
			sorters: 'name',
			filters: [{
				property: 'name',
				value: ''
			}], // filters
			data: [{
				name: 'Christy Thomas'
			},{
				name: 'Sally Struthers'
			},{                    
				name: 'Molly Ringwald'
			},{                    
				name: 'Harry Potter'
			},{                    
				name: 'Aaron Smith'
			},{                    
				name: 'Roy Hart'
			},{                    
				name: 'Bill Gates'
			},{                    
				name: 'Marilyn Monroe'
			},{                    
				name: 'Abraham Lincoln'
			},{                    
				name: 'John F. Kennedy'
			},{                    
				name: 'Bill Gates'
			},{                    
				name: 'George Orwell'
			},{                    
				name: 'Charles Darwin'
			},{                    
				name: 'Elvis Presley'
			},{                    
				name: 'Johnny Depp'
			},{                    
				name: 'Leonardo da Vinci'
			},{                    
				name: 'Louis Pasteur'
			},{                    
				name: 'Vincent Van Gogh'
			},{                    
				name: 'Thomas Edison'
			},{                    
				name: 'Rosa Parks'
			},{                    
				name: 'Queen Victoria'
			},{                    
				name: 'Prince'
			},{                    
				name: 'Richard Branson'
			},{                    
				name: 'Ernest Hemingway'
			},{                    
				name: 'John Lennon'
			},{                    
				name: 'Henry Ford'
			},{                    
				name: 'Joseph Stalin'
			},{                    
				name: 'George Bush'
			},{                    
				name: 'Madonna'
			},{                    
				name: 'Michael Jackson'
			},{                    
				name: 'Lord Baden Powell'
			},{                    
				name: 'Bob Geldof'
			},{                    
				name: 'Steve Jobs'
			},{                    
				name: 'Ronald Reagan'
			},{                    
				name: 'Barack Obama'
			},{                    
				name: 'Babe Ruth'
			},{                    
				name: 'Tiger Woods'
			},{                    
				name: 'Bill Cosby'
			},{                    
				name: 'Carl Lewis'
			},{                    
				name: 'Tom Cruise'
			},{                    
				name: 'Billie Jean King'
			},{                    
				name: 'C.S. Lewis'
			},{                    
				name: 'J.R.R. Tolkien'
			},{                    
				name: 'Anne Frank'
			},{                    
				name: 'Yoko Ono'
			},{                    
				name: 'Julie Andrews'
			},{
				name: 'John Doe'
			}]
		});
		
		var mainView = Ext.create( 'Ext.form.Panel', {
			fullscreen: 'true',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'fieldset',
				title: 'To: ',
				items: [{
					xtype: 'textareafield',
					plugins: [{
						xclass: 'Ux.plugin.InputSelector',
						store: store,
						delimiter: ', '
					}]
				}]
			}]
		});
        // Initialize the main view
        Ext.Viewport.add(mainView);
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
