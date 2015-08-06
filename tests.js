import expect from 'expect.js';

import * as AsyncStorage from './src';
console.log(AsyncStorage.getItem);

import {getItem, setItem, mergeItem, removeItem, getAllKeys, multiGet, multiSet, multiRemove, multiMerge} from './src';

let tests = async function(){
  await setItem('x', 123);
  await setItem('y', 'abc');
  await setItem('π', 'threepointone');

  await setItem('a', JSON.stringify({x: 1, y: 2, z: 3}));


  expect(await getItem('x')).to.eql(123);
  expect(await getItem('y')).to.eql('abc');
  try{
    await getItem('z')
  }
  catch(e){
    console.log('came here');
    expect(e instanceof Error).to.eql(true);
  }



  await mergeItem('a', JSON.stringify({w: 0, z: 5}));
  expect(JSON.parse(await getItem('a'))).to.eql({w: 0, x: 1, y: 2, z: 5});

  expect(await getAllKeys()).to.eql(['x', 'y', 'π', 'a']);
  await removeItem('π');
  expect(await getAllKeys()).to.eql(['x', 'y', 'a']);

  try{
    await removeItem('π');
  }
  catch(e){
    console.log('came here 2');
    expect(e instanceof Error).to.eql(true);
  }

  expect(await multiGet(['x', 'a'])).to.eql([ [ 'x', 123 ], [ 'a', '{"x":1,"y":2,"z":5,"w":0}' ] ])

  await multiSet([['x', 'alpha'], ['y', 'boogabooga']]);

  expect(await multiGet(['x', 'y'])).to.eql([ [ 'x', 'alpha' ], [ 'y', 'boogabooga' ] ]);

  await setItem('z', JSON.stringify({'what': 'now'}));
  multiMerge([['a', JSON.stringify({u: 111})], ['z', JSON.stringify({you : 'say'})]])
  expect(await multiGet(['a', 'z'])).to.eql([ [ 'a', '{"x":1,"y":2,"z":5,"w":0,"u":111}' ],
  [ 'z', '{"what":"now","you":"say"}' ] ]);
  await multiRemove(['x', 'z']);
  expect(await getAllKeys()).to.eql(['y', 'a']);
  // clear
}

tests().then(() => console.log('done')).catch(e => console.error(e.stack));
