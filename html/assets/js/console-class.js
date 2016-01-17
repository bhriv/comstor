/*****************************************************************/
// Console Class - add css to console debugging.
/*****************************************************************/

/* 
  Example Usage: send a message and the bootstrap class of 'success' to print a green console message
  cc('This is the message that will be printed in the console','success');
*/

function cc(message,console_class){
  var c = null;
  var m = message;
  switch(console_class){
    case "run":
      m = 'RUNNING: '+m;
      c = 'background: #fff; color: #82bfd8;';
      break;
    case "ready":
      c = 'background: #fff; color: #8be8cd;';
      break;
    case "done":
      c = 'color: #afdfdb;';
      break;
    case "success":
      c = 'background: #b6dbac; color: #000;';
      break;
    case "info":
      c = 'background: #ffc145; color: #000;';
      break;
    case "warning":
      m = 'WARNING: '+m;
      c = 'background: #f79f79; color: #000;';
      break;
    case "error":
      m = 'ERROR: '+m;
      c = 'background: #d71816; color: #FFF;';
      break;
    case "fatal":
      m = 'FATAL ERROR: '+m;
      c = 'background: #FF0000; color: #FFF; padding: 2px 100px;';
      break;
    default:
      c = 'background: #ffffff; color: #7ea2aa;';
  }
  console.log('%c '+m,c);
}

function runConsoleClassTests(){
  cc('Example class ready');
  cc('Example class success', 'success');
  cc('Example class warning', 'warning');
  cc('Example class info', 'info');
  cc('Example class error', 'error');
  cc('Example class fatal', 'fatal');
}