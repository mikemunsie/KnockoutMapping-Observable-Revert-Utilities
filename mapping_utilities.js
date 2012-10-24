/* 
 * KnockoutJS Mapping Utilities
 * Relies on KnockoutMapping Plugin
 * Author: Michael Munsie
 * Url: http://mikemunsie.com
 */

var mappingUtils = function(){

    var self = this;

    // Make a copy each time new results are brought in
    self.makeCopy = function(obj, array) {
        if (obj.copy) {
            delete obj.copy;
            delete obj.original_copy;
        }
        ko.mapping.fromJS(array, obj);
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
    self.removeByKey = function(obj, key, value) {
        var index, key, keys, test, _i, _j, _len, _len1, _ref;
        _ref = obj();
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
            test = _ref[index];
            if (test) {
                keys = Object.keys(obj.copy[index]);
                for (_j = 0, _len1 = keys.length; _j < _len1; _j++) {
                    key = keys[_j];
                    if (key === key) {
                        if (obj()[index][key]() === value) {
                            obj.splice(index, 1);
                            obj.copy.splice(index, 1);
                            break;
                        }
                    }
                }
            }
        }
    };

    // Restore a particular Value (where id=1)
    self.restoreByKey = function(obj, key, value) {
        var index, key, keys, test, _i, _j, _len, _len1, _ref;
        _ref = obj();
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
            test = _ref[index];
            if (test[key]() === value) {
                keys = Object.keys(obj.copy[index]);
                for (_j = 0, _len1 = keys.length; _j < _len1; _j++) {
                    key = keys[_j];
                    obj()[index][key](obj.copy[index][key]);
                }
                return true;
            }
        }
    };

    // Restore all objects back to the copy
    self.restoreUpdateAll = function(obj) {
        var index, key, keys, test, _i, _j, _len, _len1, _ref;
        _ref = obj();
        for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
            test = _ref[index];
            keys = Object.keys(obj.copy[index]);
            for (_j = 0, _len1 = keys.length; _j < _len1; _j++) {
                key = keys[_j];
                obj()[index][key](obj.copy[index][key]);
            }
        }
    };

    // Restore copy without updating
    self.restoreCompleteCopy = function(obj) {
        ko.mapping.fromJS(obj.original_copy, obj);
        obj.copy = [].concat(obj.original_copy);
    };
}
window.mappingUtils = new mappingUtils;