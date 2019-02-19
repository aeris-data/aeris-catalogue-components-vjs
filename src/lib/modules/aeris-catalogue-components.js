var css = [
  "https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.7.0/css/perfect-scrollbar.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/ol3/4.2.0/ol.css",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/themes/prism-okaidia.css"
];
var js = [
  "https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/0.7.0/js/perfect-scrollbar.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/ol3/4.2.0/ol-debug.js",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/prism.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/prism/1.6.0/components/prism-bash.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.js"
];

var i;
for (i = 0; i < css.length; i++) {
  var link = document.createElement("link");
  link.setAttribute("type", "text/css");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("href", css[i]);
  document.head.appendChild(link);
}

for (i = 0; i < js.length; i++) {
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", js[i]);
  document.head.appendChild(script);
}

export {};
