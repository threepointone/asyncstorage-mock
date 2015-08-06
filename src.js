var cache = {}, has = {}.hasOwnProperty;

function cb(fn = ()=>{}, err, res){
  return new Promise((resolve, reject) => {
    fn(err, res);
    if(err){
      return reject(err);
    }
    return resolve(res);
  });
}

function error(msg){
  return new Error(msg);
}

export async function getItem(key, callback){
  if(cache::has(key)){
    return cb(callback, null, cache[key]);
  }
  return cb(callback, error('no such key'));
}

export async function setItem(key, value, callback){
  cache[key] = value;
  return cb(callback);
}

export async function removeItem(key, callback){
  if(cache::has(key)){
    delete cache[key];
    return cb(callback);
  }
  return cb(callback, error('no such key'));
}

export async function mergeItem(key, value, callback){
  cache[key] = JSON.stringify({...JSON.parse(cache[key]), ...JSON.parse(value)});
  return cb(callback);
}

export async function clear(callback){
  cache = {};
  return cb(callback);
}

export async function getAllKeys(callback){
  return cb(callback, null, Object.keys(cache));
}

export async function multiGet(keys, callback){
  var arr = [], i =0;
  while(i<keys.length){
    arr.push([keys[i], await getItem(keys[i])]);
    i++;
  }
  return cb(callback, null, arr);
}

export async function multiSet(keyvalues, callback){
  var i =0;
  while(i<keyvalues.length){
    await setItem(keyvalues[i][0], keyvalues[i][1]);
    i++;
  }
  return cb(callback);
}

export async function multiRemove(keys, callback){
  var i =0;
  while(i<keys.length){
    await removeItem(keys[i]);
    i++;
  }
  return cb(callback);
}

export async function multiMerge(keyvalues, callback){
  var i =0;
  while(i<keyvalues.length){
    await mergeItem(keyvalues[i][0], keyvalues[i][1]);
    i++;
  }
  return cb(callback);
}
