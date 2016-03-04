/*****************************************************************/
// Console Class - add css to console debugging.
/*****************************************************************/

/* 
  Example Usage: send a message and the bootstrap class of 'success' to print a green console message
  cc('This is the message that will be printed in the console','success');
*/


var theme_run     = null,
    theme_ready   = null,
    theme_done    = null,
    theme_success = null,
    theme_info    = null,
    theme_warning = null,
    theme_error   = null,
    theme_fatal   = null,
    theme_default = null,
    theme_data    = null,
    theme_highlight   = 'color: #000000; padding: 2px 10px; border: dotted 2px green; font-family: "Courier New", Courier, monospace;';

var theme = 'batman';

switch(theme){
  case "monalisa":
    theme_run     = 'color: #d5ae56;';
    theme_ready   = 'color: #808a58;';
    theme_done    = 'color: #8d7f48;';
    theme_success = 'color: #d5ae56;';
    theme_info    = 'color: #e0b75d;';
    theme_warning = 'color: #b38138;';
    theme_error   = 'background: #b94631; color: #fff;';
    theme_fatal   = 'background: #a9471d; color: #FFF; padding: 2px 100px;';
    theme_default = 'color: #000000;';
    theme_data    = 'color: #000000; padding: 2px 5px; border: dotted 1px #777; font-family: "Courier New", Courier, monospace;';
    break;
  case "batman":
    theme_run     = 'color: #ccc65e;';
    theme_ready   = 'background: #6a9c7c; color: #fff; padding: 1px 10px;';
    theme_done    = 'color: #535135;';
    theme_success = 'background: #000; color: #f7ef11; padding: 1px 10px;';
    theme_info    = 'background: #137bb3; color: #fff; padding: 1px 10px;';
    theme_warning = 'color: #bab4b5;';
    theme_error   = 'background: #8b1c15; color: #fff;';
    theme_fatal   = 'background: #de1e23; color: #fff; padding: 2px 100px;';
    theme_default = 'color: #000000;';
    theme_data    = 'color: #000000; padding: 2px 5px; border: dotted 1px #777; font-family: "Courier New", Courier, monospace;';
    break;
  default:
    theme_run     = 'background: #fff; color: #82bfd8;';
    theme_ready   = 'color: #8be8cd;';
    theme_done    = 'color: #000000;';
    theme_success = 'background: #b6dbac; color: #000;';
    theme_info    = 'background: #ffc145; color: #000;';
    theme_warning = 'background: #f79f79; color: #000;';
    theme_error   = 'background: #d71816; color: #FFF;';
    theme_fatal   = 'background: #FF0000; color: #FFF; padding: 2px 100px;';
    theme_default = 'background: #ffffff; color: #7ea2aa;';
    theme_data    = 'color: #000000; padding: 2px 5px; border: dotted 1px #777; font-family: "Courier New", Courier, monospace;';
}

function cc(message,console_class){
  var c = null;
  var m = message;
  switch(console_class){
    case "run":
      m = 'RUNNING: '+m;
      c = theme_run;
      break;
    case "ready":
      c = theme_ready;
      break;
    case "done":
      c = theme_done;
      break;
    case "success":
      c = theme_success;
      break;
    case "info":
      c = theme_info;
      break;
    case "warning":
      m = 'WARNING: '+m;
      c = theme_warning;
      break;
    case "error":
      m = 'ERROR: '+m;
      c = theme_error;
      break;
    case "fatal":
      m = 'FATAL ERROR: '+m;
      c = theme_fatal;
      break;
    case "data":
      m = m;
      c = theme_data;
      break;
    case "highlight":
      m = m;
      c = theme_highlight;
      break;
    default:
      c = theme_default;
  }
  console.log('%c '+m,c);
}

function runConsoleClassTests(){
  cc('Example class run', 'run');
  cc('Example class ready', 'ready');
  cc('Example class success', 'success');
  cc('Example class warning', 'warning');
  cc('Example class info', 'info');
  cc('Example class error', 'error');
  cc('Example class fatal', 'fatal');
  cc('Example class data', 'data');
}
