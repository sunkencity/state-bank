// 
// path syntax = foo.bar.baz[3]
//


function pathToArray(path) {
  var aa = [], 
      i = 0,
      curr = null,
      match = null,
      rexp = /(.+)\[(\d+)\]$/,
      a  = path.split(".");

  for (i=0;i<a.length;i++) {
    curr = a[i];
    if (null !== (match = curr.match(rexp))) {
      aa.push(match[1]);
      aa.push(parseInt(match[2], 10));
    } else {
      aa.push(curr);
    }
  }

  return aa;
}

/**
 * merge properties from obj1 to obj2
 */
function merge(obj1, obj2) {
  for (var prop in obj1) {
    if (obj1.hasOwnProperty(prop)) {
      obj2[prop] = obj1[prop];
    }
  }
}

/**
 * walk object tree
 * @param cb(err, childObjectThatHasKey, key);
 */

function objectWalk(st8t, path, cb) {
  var a    = pathToArray(path), 
      len  = a.length,
      last = len - 1,
      i    = 0, 
      ptr  = st8t,
      key  = null;

  for (i=0;i<len;i++) {
    key = a[i];
    if (i == last) {
      cb(null, ptr, key);
      return;
    } else {
      if (ptr.hasOwnProperty(key)) {
        ptr = ptr[key];
      } else {
        cb({error: "missing key index #"+i+" "+key});
        return;
      }
    }
  }
  cb({error: "reached end of object walk"});
}

/**
 * higher order function
 * pre-walk object path
 */
function mkWalker(fn) {
  return function(st8t, path, optional_value) {
    objectWalk(st8t, path, function(err, obj, prop) {
      fn(err,obj,prop, optional_value);
    });
  };
}

/**
 * set property
 * @param st8t
 * @param path
 * @param value
 */
module.exports.set = mkWalker(function(err, o, prop, v) { 
  o[prop] = v; 
});

/**
 * remove property
 * @param st8t
 * @param path
 */
module.exports.del = mkWalker(function(err, o, prop) { 
  delete o[prop]; 
});

/**
 * shallow merge a property on a path
 * @param st8t
 * @param path
 * @param new values
 */
module.exports.merge = mkWalker(function(err, o, prop, value) { 
  merge(value, o[prop]); 
});

/**
 * push item or items to last in an array
 * @param st8t
 * @param path
 * @param value
 */
module.exports.push = mkWalker(function(err, o, prop, value) { 
  o[prop].push(value); 
});

/**
 * unshift item or items to first in an array
 * @param st8t
 * @param path
 * @param value
 */
module.exports.unshift = mkWalker(function(err, o, prop, value) { 
  o[prop].unshift(value); 
});

/**
 * update at path by applying function
 * @param st8t
 * @param path
 * @param cb
 */
module.exports.apply = mkWalker(function(err, o, prop, cb) { 
  o[prop] = cb(o[prop]); 
});


