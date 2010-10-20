/* ==============================================================
    Toggler v0.1
    This is a proof of concept script for mimicking the toggle
    functionality of some desktop applications like Adobe Photoshop.

    Jonathan Snook
    http://snook.ca/
    June 4, 2007

    Usage:
    var toggle = new Toggler('elementId');
    toggle.start(); // start the toggler (enabled by default)
    toggle.stop(); // stop the toggler
*/

function Toggler(elId)
{
  var _started = false;
  var _checked = false;
  var _firstTarget;
  var _el;

  init();

  /* hooks up the */
  function init()
  {
    _el = document.getElementById(elId);
    if(_el) _el.onmousedown = _checkInit;
  }

  function _checkInit(e)
  {
    e = e || window.event;
    _firstTarget = e.srcElement || e.target;
    if(_firstTarget && _firstTarget.nodeType == 1 && _firstTarget.type == 'checkbox' && !_started)
    {
      _checked = !_firstTarget.checked;
      _firstTarget.onmouseout = function(){_firstTarget.checked = _checked;}
      _el.onmouseup = _stop;
      _start();
    }
  }

  /* private method to actually toggle the checkbox */
  function _toggleCheckbox(e)
  {
    e = e || window.event;
    var target = e.srcElement || e.target;
    if(target && target.nodeType == 1 && target.type == 'checkbox')
    {
      target.checked = _checked;
    }
  }

  /* private method to start the toggle sequence */
  function _start()
  {
    _started = true;
    _el.onmouseover = _toggleCheckbox;
  }

  /* private method to stop the toggle sequence */
  function _stop(e)
  {
    e = e || window.event;
    var target = e.srcElement || e.target;
    if(target === _firstTarget)
    {
      target.checked = !_checked;
    }
    _started = false;
    _el.onmouseup = null;
    _el.onmouseover = null;
    _firstTarget.onmouseout = null;
  }

  /* public methods to start or stop the toggler */
  var o = {
    start:function(){ init(); },
    stop:function(){ _el.onmousedown = null; }
  };
  return o;
}
