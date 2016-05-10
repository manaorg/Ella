# Ella

Is an NodeJS native plugin to allow Java code execution inside V8/NodeJS container. Is done in C++11 to make use of object oriented design.

###Why 

- because Java have very good ecosystem of libraries like PDFBox, iText, Solr, etc.., all mature and useful.
- the objective is to create wrappers around the library you want and use it in your Node app.
 
### Features 
  
  - The JVM run in the same NodeJS process as a native add-on so comunication between each other is fast. 
  - Allow you to load jar/classes and use them inside NodeJS like Javascript objects literals.  
  - You can send blocking Java calls to a background thread and assign a callback to continue when finished.
  - The API can choose the right method giving a set of arguments, so it solves the method overloading in Java. [experimental]. 
  - Exception handling, exception thrown by JVM are translated to Javascript [exception](http://www.w3schools.com/js/js_errors.asp). 
 
### Things to be added soon. 
	
  - support to static classes.
  - support to non-void constructor. 
  - support for java.lang.object derivatives args/return.
 
 
### Supported types [for now] 
  - Primitive
    - int
    - java.lang.String 
    - double 
    - byte[] - to Buffer to handle binaries.

  - Object [comming soon...]

### Installation

Ella requires [Node.js](https://nodejs.org/) v4+ to run.

```sh
$ export JAVA_HOME=/jdk/location/     #finish with / is important here, there is a bug in the installer :(
$ npm install ella
```

### Methods

#### setClassPath ( path: string, recursive: true)

path: path where to find the .jars/.class

recursive: true/false, if true look for jar/classes recursively. 


This method allow us to configure the classpath,  

```sh
	var ella = require('ella');
	ella.setClassPath('/folder/with/.jars/.class', true);   
```



#### getClassPath ( void )

return the classpath configuration. 

This method allow us to configure the classpath.

```sh
	ella.getClassPath();  //myjar1.jar:myjar2.jar   
```


#### start ( callback )

create an JVM instance asynchronously.
 
callback(instance): function take as parameter an instance of the JVM. 

This method allow us to configure the classpath.

```sh
	ella.start(function(vm){  /* do some work with vm */   })
```



#### vm.new (string qualified classname)

given a classname create a new object.

```sh
	var stringBuffer = vm.new('java.lang.StringBuffer');
	
	// stringBuffer.append
	// stringBuffer.insert
	// stringBuffer.substring 
	// ....
```

### sync call 

To make an sync call just call the method.

```sh
	stringBuffer.append('hello'); 
	console.log(stringBuffer.toString() );  //hello. 
```


### async call 

Just call the method as normal and add a function callback as an extra parameter this extra parameter transform the call to async. 

```sh
	
	var pdf = vm.new('com.pdf.Library'); // method signature  byte[] createPDF(string); 
	
	var buffer = pdf.createPDF('my_blocking.pdf');   // this call will block the interpreter in this position. 
	
	// the addition of an anonymous function make this method async.
	pdf.createPDF('my_async.pdf', function(buffer){  /* do some work with buffer */ }); // non-blocking call.
	
	//js code.......
```








