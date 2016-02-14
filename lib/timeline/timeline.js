function drawTimeline(cfg) {

  // config
  var x0 = 20;
  var y0 = 40;
  
  var marginAroundYears = 20;
  
  var horizontalMarginAroundEvents = 20;
  var verticalMarginAroundEvents = 20;
  
  var yearWidth = 60;
  var yearHeight = 40;
  
  var eventWidth = 250;
  var eventHeight = 60;
  
  // find min, max
  var min, max;
  for (var i=0; i<cfg.events.length; ++i) {
    var begin = parseYear(cfg.events[i].begin);
    var end = parseYear(cfg.events[i].end) || begin;
    if (begin) {
      min = min ? Math.min(min, begin) : begin;
      max = max ? Math.max(max, end) : end;
    }
  }
  
  // cleanup  
  cfg.container.innerHTML = '';
  
  // create container
  var container = document.createElement('div');
  container.classList.add('timeline-container');
  cfg.container.appendChild(container);
  
  // draw
  var timelineY = drawEvents(x0, y0);
  drawMarkers(timelineY);
  drawYears(x0, timelineY);
  
  // set container dimensions
  container.style.height = (timelineY + 2*yearHeight + 2*marginAroundYears) + 'px';
  
  function parseYear(year) {
    if (typeof year === 'string') {
      var res = year.match(/\d\d\d\d/);
      return res && res.length > 0 ? parseInt(res[0], 10) : null;
    }
    return year;
  }
  
  function drawEvents(x0, y0) {
    var y = y0;
    
    var rows = [];
    function getRow(x, duration) {
      var i=0;
      var eventEnd = x + Math.max(eventWidth, duration);
      for (; i<rows.length; ++i) {
        if (rows[i] + horizontalMarginAroundEvents < x) {
          rows[i] = eventEnd;
          return i;
        }
      }
      rows.push(eventEnd);
      return i;
    }
    
    for (var i=0; i<cfg.events.length; ++i) {
      var event = cfg.events[i];
      var eventBegin = parseYear(event.begin);
      var eventEnd = parseYear(event.end);
      if (eventBegin) {
        var x = x0 + (eventBegin - min + 0.5) * yearWidth;
        var duration = eventEnd ? (eventEnd - eventBegin) * yearWidth : 0;
        var y = y0 + getRow(x, duration) * (eventHeight + verticalMarginAroundEvents);
        
        // picture
        var pictureWidth = eventHeight*4/3;
        var div = document.createElement('div');
        div.classList.add('event-picture');
        div.style.top = y + 'px';
        div.style.left = x + 'px';
        div.style.width = pictureWidth + 'px';
        div.style.height = eventHeight + 'px';
        div.style.backgroundImage = 'url(' + event.picture + ')';
        div.addEventListener('click', function() {window.location = this.link;}.bind(event));
        container.appendChild(div);
        
        // event
        var div = document.createElement('div');
        div.classList.add('event-desc');
        div.style.top = y + 'px';
        div.style.left = (x + pictureWidth) + 'px';
        div.style.width = (eventWidth - pictureWidth) + 'px';
        div.style.height = eventHeight + 'px';
        div.innerHTML = '<ul><li>' + event.name + '</li><li>' + event.begin + '</li><li>' + event.end + '</li></ul>';
        div.addEventListener('click', function() {window.location = this.link;}.bind(event));
        container.appendChild(div);
        
        // duration
        var div = document.createElement('div');
        div.classList.add('event-duration');
        div.style.top = (y + eventHeight + 3) + 'px';
        div.style.left = x + 'px';
        div.style.width = duration + 'px';
        div.style.height = '10px';
        container.appendChild(div);
        
        event.x = x;
        event.y = y;
      }
    }
    
    return y0 + rows.length * (eventHeight + verticalMarginAroundEvents);
  };
  
  function drawMarkers(timelineY) {
    for (var i=0; i<cfg.events.length; ++i) {
      var event = cfg.events[i];
      var div = document.createElement('div');
      div.classList.add('event-marker');
      div.style.top = (event.y + eventHeight) + 'px';
      div.style.left = event.x + 'px';
      div.style.width = '1px';
      div.style.height = (timelineY + marginAroundYears - (event.y + eventHeight)) + 'px';
      container.appendChild(div);
    }
  }
 
  function drawYears(x0, y0) {
    var x = x0;
    var y = y0 + marginAroundYears;
    
    // years
    for (var i=min; i<=max; ++i) {
      var div = document.createElement('div');
      div.classList.add('year');
      div.style.top = y + 'px';
      div.style.left = x + 'px';
      div.style.width = yearWidth + 'px';
      div.style.height = yearHeight + 'px';
      div.style.lineHeight = yearHeight + 'px';
      div.innerHTML = i;
      container.appendChild(div);
      
      x += yearWidth;
    }
    
    // arrow
    var div = document.createElement('div');
    div.classList.add('year-arrow');
    div.style.top = y + 'px';
    div.style.left = x + 'px';
    container.appendChild(div);
  };
  

}