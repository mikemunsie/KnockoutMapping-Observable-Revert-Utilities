/* 
 * KnockoutJS Mapping Utilities
 * Relies on KnockoutMapping Plugin
 * Author: Michael Munsie
 * Url: http://mikemunsie.com
 *
 * Notes:
 * For objects and not arrays, you can use: restoreByKey and restoreUpdateAll
 * Ex: restoreByKey(obj, "first_name")
 */

var mappingUtils = function(){

    var self = this;

    // Make a copy each time new results are brought in
    self.makeCopy = function(obj, array) {
        if (obj.copy) {
            delete obj.copy;
            delete obj.original_copy;
        }
        if(Array.isArray(array)){
            ko.mapping.fromJS(array, obj);
        }else{
            obj(ko.mapping.fromJS(array));
        }
        obj.original_copy = [].concat(array); 
        obj.copy = [].concat(array);      
    };

    // Add a row
    self.addRow = function(obj, row, append_type) {
        var new_obj = ko.mapping.fromJS(row);
        if (append_type == null) {
            append_type = "after";
        }
        delete new_obj['__ko_mapping__'];
        if (append_type == "before") {
            obj.unshift(new_obj);
            obj.copy.unshift(row);
        } else {
            obj.push(new_obj);
            obj.copy.push(row);
        }
    };

    // Remove by Key
    self.removeByKey = function(obj, _key, _value) {
        var index, key, keys, test, _i, _j, _len, _len1, _ref;
        _ref = obj();
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
            test = _ref[index];
            if (test) {
                $.each(obj.copy[index], function(key, value) {
                    if (key === _key) {
                        if (obj()[index][key]() === _value) {
                            obj.splice(index, 1);
                            obj.copy.splice(index, 1);
                            return;
                        }
                    }
                });
            }
        }
    };

    // Restore a particular Value (where id=1)
    self.restoreByKey = function(obj, key, value) {
        if(Array.isArray(obj)){
            var index, key, keys, test, _i, _j, _len, _len1, _ref;
            _ref = obj();
            for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
                test = _ref[index];
                if (test[key]() === value) {
                    $.each(obj.copy[index], function(key, value) {
                        obj()[index][key](obj.copy[index][key]);
                    });
                    return true;
                }
            }
        }else{
            $.each(obj.copy[0], function(_key, value) {
                if(_key == key){
                    obj()[key](obj.copy[0][key]);
                }
                return;
            });
            return true;
        }
    };

   // Restore all objects back to the copy
    self.restoreUpdateAll = function(obj) {
        if(Array.isArray(obj)){
            var index, key, keys, test, _i, _j, _len, _len1, _ref;
            _ref = obj();
            for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
                test = _ref[index];
                $.each(obj.copy[index], function(key, value) {
                    obj()[index][key](obj.copy[index][key]);
                });
            }
        }else{
            $.each(obj.copy[0], function(key, value) {
                obj()[key](value);
            });
        }
    };

    // Restore copy without updating
    self.restoreCompleteCopy = function(obj) {
        ko.mapping.fromJS(obj.original_copy, obj);
        obj.copy = [].concat(obj.original_copy);
    };
}
window.mappingUtils = new mappingUtils;