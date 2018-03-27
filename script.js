function inIframe () { 
  try { 
    return window.self !== window.top; 
  } catch (e) { 
    return true; 
  } 
}

let colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
let currentQuote = '', currentAuthor = '';
let quotes = [];
let cnt = 2;
function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

function previusQuote(){
  if(quotes.length - cnt < 0){
    currentQuote = quotes[0].quote;
    currentAuthor = quotes[0].author;  
  }else{
    currentQuote = quotes[quotes.length - cnt].quote;
    currentAuthor = quotes[quotes.length - cnt].author;
    cnt++;
  }
  

  if(inIframe()){
    $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
  }

  $(".text").animate({
    opacity: 0
  }, 500,
  function() {
    $(this).animate({
      opacity: 1
    }, 500);
    $('#text').text(currentQuote);
  });

$(".author").animate({
    opacity: 0
  }, 500,
  function() {
    $(this).animate({
      opacity: 1
    }, 500);
    $('#author').html(currentAuthor);
  });

  document.body.style.background = colors[Math.floor(Math.random() * colors.length)];

}

function getQuote() {
  cnt = 2;
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: (data) => {
      currentQuote = data.quote;
      currentAuthor = data.author;
      quotes.push({quote:currentQuote, author:currentAuthor});
      if(quotes.length != 1){
        console.log(quotes[quotes.length - 2]);
      }
      
      if(inIframe()){
        $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
      }

      $(".text").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#text').text(data.quote);
        });

      $(".author").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#author').html(data.author);
        });

      document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
    }
  });
}
$(document).ready(function() {
  getQuote();
  $('#new').on('click', getQuote);
  $('#previus').on('click', previusQuote);
  $('#tweet-quote').on('click', function() {
    if(!inIframe()) {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
    }
  });
});