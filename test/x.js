var ella = require('../build/Debug/ella'); 

ella.start(function(o){
  var s = o.New('java.lang.StringBuffer');
  s.append('hello');
  s.append('world');
  s.reverse();
  console.log('->',s);
})