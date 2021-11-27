j = -100;
var pivl = [];
var pivltr = [];
while (j < 100) {
  vl = j * (math.pi) / 2;
  pivl.push(vl); //making a array containing values of n*pi/2
  vltr = parseFloat(vl.toFixed(2));
  pivltr.push(vltr);
  j++;
}
clcktm=0;
document.getElementById('inputfuncx').addEventListener('input',(ev) => {
    // `ev.target` is an instance of `MathfieldElement`
    funcinpx=ev.target.getValue('ascii-math');
});
document.getElementById('inputfuncy').addEventListener('input',(ev) => {
    // `ev.target` is an instance of `MathfieldElement`
    funcinpy=ev.target.getValue('ascii-math');
});
function plotgraph() {

    funcinpx.trim();
    funcinpx=funcinpx.replace(/⋅/g, "*");
    funcinpy.trim();
    funcinpy=funcinpy.replace(/⋅/g, "*");


  var dmnstart = parseFloat(document.getElementById("dmnstart").value);
  var dmnend = parseFloat(document.getElementById("dmnend").value);

  const exprx = math.compile(funcinpx);
  const expry = math.compile(funcinpy);
  let valt = math.range(dmnstart, dmnend, 0.01).toArray();
  valt = valt.map(a => parseFloat(a.toFixed(2)));
  i = 0;
  while (i < valt.length) {
    if (pivltr.includes(valt[i])) {
      j = pivltr.indexOf(valt[i]);
      valt[i] = pivl[j];
    }
    i++;
  }
  
  const xValues = valt.map(function (t) {
    return exprx.evaluate({
      t: t
    })
  })
  const yValues = valt.map(function (t) {
    return expry.evaluate({
      t: t
    })
  })
while(j<xValues.length){
  if(xValues[j]<10**(-6)){
  xValues[j]=xValues[j].toFixed(4);
  }
  if(yValues[j]<10**(-6)){
  yValues[j]=yValues[j].toFixed(4);
  }
  j++;
  }

  //////////////////////////////////////////////////////////////////////////////////////////



k=0;
while (k < yValues.length) {
        if (yValues[k] > (10 ** 15)) { //positive infinity
            yValues[k] = Infinity;
        };
        if (yValues[k] < -(10 ** 15)) { //negative infinity
            yValues[k] = -Infinity;
        }
k++;
}

///////////////////////////////////find roots//////////////////////////////////////////////////
rootsx=[];
rootsy=[];
while(k<yValues.length){
  if (yValues[k] == 0) { //roots  --> y=0
    rootsx.push(xValues[k]);
    rootsy.push(yValues[k]);
}
if(xValues[k]==0){
  rootsx.push(xValues[k]);
  rootsy.push(yValues[k]);
}
if (Math.abs(yValues[k]) < (10 ** -12)) { //roots  ----> abs(y)< 10^-12
    yValues[k] = 0;
    rootsx.push(xValues[k]);
    rootsy.push(yValues[k]);
}
if(Math.abs(xValues[k]) < (10 ** -12)){
  xValues[k]=0;
  rootsx.push(xValues[k]);
  rootsy.push(yValues[k]);
}

k++;
}

//////////////////////////////////////////plot//////////////////////////////////////////////////////
wrkwdth=$("#workspace").width();
wrkwdth=wrkwdth-50;
wrkrng=wrkwdth/60;

  var plotline = {
    x: xValues,
    y: yValues,
    type: 'scatter',
  line: {
    color: 'rgb(133,234,176,0.8)'
  }
  };
  var roots = { //making roots dataset
    x: rootsx,
    y: rootsy,
    name: 'root',
    type: 'scatter',
    mode: 'markers',
    marker: {
        color: 'rgba(133,234,176, 1)',
        size: 5
    },
    showlegend: false
};if($("body").hasClass("dark-bg")){
  darkplottoggle = 1;
  }
  else{
      darkplottoggle=0;
  }
if (darkplottoggle == 0) {
  layout = { //making layout
      xaxis: {
          range: [-wrkrng, wrkrng]
      },
      yaxis: {
          range: [-10, 10]
      },
      width: wrkwdth,
      height: 600,
      dragmode: 'pan',
      autosize: false,
      hovermode: 'closest',
      margin: {
          l: 20,
          r: 20,
          b: 20,
          t: 20,
          pad: 4
      },
      paper_bgcolor: '#fdfcfc',
      plot_bgcolor: '#fdfcfc'
  };
}
else {
  layout = { //making layout
      xaxis: {
          range: [-wrkrng, wrkrng]
      },
      yaxis: {
          range: [-10, 10]
      },
      width: wrkwdth,
      height: 600,
      dragmode: 'pan',
      autosize: false,
      hovermode: 'closest',
      margin: {
          l: 20,
          r: 20,
          b: 20,
          t: 20,
          pad: 4
      },
      paper_bgcolor: '#25232D',
      plot_bgcolor: '#25232D'
  };
};



data = [plotline, roots];

if(clcktm==0){
  Plotly.newPlot('plotarea', data,layout, { displaylogo: false ,scrollZoom: true, responsive: true,modeBarButtonsToRemove: ['select2d', 'lasso2d', 'toggleSpikelines', 'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian'] });
  clcktm=1;
}
else if(clcktm==1){
    Plotly.animate('plotarea', {
    data: data
  }, {
    transition: {
      duration: 500,
      easing: 'cubic-in-out'
    },
    frame: {
      duration: 500
    }
  })
}

}


//dark mode toggle
function toggledark(){

  $("body").toggleClass("dark-bg");
  $(".navbar").toggleClass("dark-bg"); //navbar
  $(".navbar").toggleClass("text-white");
  $("#dmnend").toggleClass("text-white");
  $("#dmnstart").toggleClass("text-white");
  $("#workspace").toggleClass("dark-bg"); //workspace

  if (!$("#controls").hasClass('bg-dark')) {
    $("#controls").removeClass('bg-white');
    $("#controls").addClass('bg-dark');
    $("#controls").addClass('text-white');
} else {
    $("#controls").removeClass('bg-dark');
    $("#controls").addClass('bg-white');
    $("#controls").removeClass('text-white');
}
/////////////////////////////////////// home button icon change /////////////////////////////////////////////////////////

if (!$("#home-btn").hasClass('whitebtn')) {
  $("#home-btn").attr('src', './content/icons/homewhite.png');
  $("#home-btn").addClass('whitebtn')
} else {
  $("#home-btn").attr('src', './content/icons/homeblack.png');
  $("#home-btn").removeClass('whitebtn')
}


/////////////////////////////////////// apps button icon change ////////////////////////////////////////////////


if (!$("#apps-btn").hasClass('whitebtn')) {
  $("#apps-btn").attr('src', './content/icons/appswhite.png');
  $("#apps-btn").addClass('whitebtn')
} else {
  $("#apps-btn").attr('src', './content/icons/appsblack.png');
  $("#apps-btn").removeClass('whitebtn')
}


////////////////////////////////////// about button icon change ////////////////////////////////////////////////////


if (!$("#about-btn").hasClass('whitebtn')) {
  $("#about-btn").attr('src', './content/icons/aboutwhite.png');
  $("#about-btn").addClass('whitebtn')
} else {
  $("#about-btn").attr('src', './content/icons/aboutblack.png');
  $("#about-btn").removeClass('whitebtn')
}


///////////////////////////////////// dark mode button icon change ////////////////////////////////////////////////


if (!$("#drkmd-btn").hasClass('whitebtn')) {
  $("#drkmd-btn").attr('src', './content/icons/sun.png');
  $(".btn-round").addClass('bg-white');
  $(".btn-round").removeClass('bg-dark');
  $("#drkmd-btn").addClass('whitebtn')
} else {
  $("#drkmd-btn").attr('src', './content/icons/moon.png');
  $("#drkmd-btn").removeClass('whitebtn');
  $(".btn-round").removeClass('bg-white');
  $(".btn-round").addClass('bg-dark');
}

if (darkplottoggle == 0) {
  layout = { //making layout
    autosize: false,
      width: wrkwdth,
      height: 600,
      margin: {
          l: 20,
          r: 20,
          b: 20,
          t: 20,
          pad: 4
      },
      paper_bgcolor: '#25232D',
      plot_bgcolor: '#25232D'
  };
  Plotly.react('plotarea', data, layout, {
      displaylogo: false,
      scrollZoom: true,
      responsive: true,
      modeBarButtonsToRemove: ['select2d', 'lasso2d', 'autoScale2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian']
  }); //using Plotly.react becoz its faster , it creates the plot again

  darkplottoggle = 1;

} else {

  layout = { //making layout
    autosize: false,
    width: wrkwdth, 
      height: 600,
      margin: {
          l: 20,
          r: 20,
          b: 20,
          t: 20,
          pad: 4
      },
      paper_bgcolor: '#fcfcfc',
      plot_bgcolor: '#fcfcfc'
  };
  Plotly.react('plotarea', data, layout, {
      displaylogo: false,
      responsive: true,
      scrollZoom: true,
      modeBarButtonsToRemove: ['select2d', 'lasso2d', 'autoScale2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian']
  }); //using Plotly.react becoz its faster , it creates the plot again

  darkplottoggle = 0;
}

}