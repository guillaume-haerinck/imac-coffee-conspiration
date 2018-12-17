import "./hacked.scss";


function getOS() {
  var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'macos';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'ios';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'linux';
  }

  return os;
}

var timeOut = 15000;

if(getOS() == 'windows') {
  timeOut = 50000;
  document.getElementById('mac-crash').src = `https://geekprank.com/win10-update/`;
}

else if(getOS() == 'mac') {
  timeOut = 15000;
  document.getElementById('mac-crash').src = `https://geekprank.com/apple/`;
}

else if(getOS() == 'linux') {
  timeOut = 10000;
  document.getElementById('mac-crash').src = `https://geekprank.com/apple/`;
} 

document.addEventListener("DOMContentLoaded", function(event){
    document.getElementById(`mac-crash`).style.display = 'block';

    setTimeout(function(){
        document.getElementById(`prank`).style.display = 'none';
    }, timeOut);
});
