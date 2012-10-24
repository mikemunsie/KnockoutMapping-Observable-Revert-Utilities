KnockoutMapping-Observable-Revert-Utilities
===========================================

A collection of routines that aid in reverting observables back to their original values.

Example Code: (also see the demo @ http://jsfiddle.net/dkrru/7/)

<code>
var globalModel = function() {
    var self = this;
    self.all_results = ko.mapping.fromJS([]);

    // Constructor
    self.init = function() {
        self.get_data();
    }

    // Fake function to go grab data
    self.get_data = function() {
        var fake_data = [{
            "id": 0,
            "first_name": "Mike",
            "last_name": "Munsie"
        }];
        mappingUtils.makeCopy(self.all_results, fake_data);            
    };
    
    // Add a User
    self.add_user = function(){
        var fake_user = {
            "id": -1,
            "first_name": "New",
            "last_name": "User"
        };        
        mappingUtils.addRow(self.all_results, fake_user, "before");        
    };

    // Remove a User
    self.remove_user = function(user){
        mappingUtils.removeByKey(self.all_results, 'id', user.id());
    }
    
    // Restore Update All Users
    self.restore_update = function(){
        mappingUtils.restoreUpdateAll(self.all_results);            
    }    
                
    // Restore all Users                
    self.restore_users = function(){         
        mappingUtils.restoreCompleteCopy(self.all_results);
    }

    // Call the Constructor
    self.init();
}

$(document).ready(function() {
    window.globalModel = new globalModel;
    ko.applyBindings(window.globalModel, $("body ").get(0));
});
</code>