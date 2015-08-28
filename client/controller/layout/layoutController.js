  
/*

Created by LingaRaja.

Has the events and helpers related to home page.

*/

var showPost = true;

Meteor.subscribe('featuredimage');

Template.header.events({
   'click #pageName': function() {
    Session.set('numberOfCount',4);
      $('.give-more-content').show();
      Session.set('selectedPostId',"");        
      Session.set("pageId",this._id);
   },
   'click #backToPage' : function()  {
       Session.set('selectedPostId',"");
       Session.set("pageId",Session.get("selectedPageId"));        
       history.back();
   }
});

Template.header.helpers({
   'pagesList' : function() {
       return Pages.find();
   },
   'showSelectedPost' : function() {
       if(Session.get('selectedPostId')){
           return Posts.findOne({_id: Session.get('selectedPostId')});            
       }
   },    
});

Template.home.events({
   'click #postTitle': function() {
       var userId = this._id;
       Session.set('selectedPageId',Session.get("pageId"));
       Session.set('selectedPostId', userId);
       $('.image').animate({width: 'toggle'}, 770);
       setTimeout(function(){
            Router.go("/post/"+userId);
       }, 1000);  
   },
    'click .right-arrow' : function(){
     var userId = this._id;
       Session.set('selectedPageId',Session.get("pageId"));
       // Session.set("pageId","");        
       Session.set('selectedPostId', userId);
       $('.image').animate({width: 'toggle'}, 770);
       setTimeout(function(){
            Router.go("/post/"+userId);
       }, 1000);  
   },
    'click .Ask' : function(){   
       if(showPost){          
          $('#post').hide();
          $('#showPost').show().animate({"width": "50%"}, "fast");
          showPost = false;  
       }else{
        $('#post').show();
        $('#showPost').hide().animate({"width": "-50%"}, "slow");
          showPost = true;  
       }    
  },
  'click .give-more-content' : function() {
   $('.loading-icon').show();
    Meteor.setTimeout(function(){
    $('.loading-icon').hide();
      Session.set('numberOfCount', Session.get('numberOfCount') +4);
          if(Session.get('postCount')<=Session.get('numberOfCount')){
            $('.give-more-content').hide();
            $('.posts-Over').show();
            Meteor.setTimeout(function(){$('.posts-Over').hide()},1500);
          }
    }, 1000);
  }
});
Template.home.helpers({
   'postsList' : function() {
      // Session.set('postCount',Posts.find({pageId:Session.get("pageId")}).count());
      return Posts.find();
   },  
  'mediaList' : function() {
    return Media.find();
   },

   // 'showSelectedPost' : function() {
   //     if(Session.get('selectedPostId')){
   //         // var temp = Session.get('selectedPostId');
   //         // Session.set('selectedPostId',"");
   //         // console.log('temp.........'+temp);
   //         return Posts.findOne({_id: Session.get('selectedPostId')});            
   //     }
   // },
   // 'imageList' : function() {
   //     return featuredimage.find();
   // }
});

Template.header.helpers({
    'homeSliderList' : function() {
        return homeslider.find({status:"Published"});
    },
    'singlehomeSlider' : function() {
        return homeslider.findOne({status:"Published"}, { limit:1 });
    },
    'isHomeSlider' : function() {
        return homeslider.findOne({status:"Published"});
    },    
});

Template.home.helpers({
  'imageList' : function() {
       return featuredimage.find();
   }
})

Template.postDetail.helpers({
   'showSelectedPost' : function() {
       if(Session.get('selectedPostId')){
           // var temp = Session.get('selectedPostId');
           // Session.set('selectedPostId',"");
           // console.log('temp.........'+temp);
           return Posts.findOne({_id: Session.get('selectedPostId')});            
       }
       $('#postDetail').fadeIn(10000);          
   },
   'imageList' : function() {
       return featuredimage.find();
   },
   'singlePostSlider' : function(){
    return featuredimage.findOne({postId:Session.get('selectedPostId')}, { limit:1 });
   }
});

Template.home.rendered = function () {
     console.log("rendered");

   $('#Pages').hide();
   $('.loading-icon').show();

  jQuery(function ($) {
      var
      container   = $('#indy-masonry-container'),
      button    = $('#add'),
      html    = container.html();

      $(document).ready(function() {               
        Meteor.setTimeout(function(){   
          $('.loading-icon').hide();
          $('#Pages').show();        
            
             container            
            .indyMasonry();

        $('body')     
      },5000)      
      });

      button.on('click', function() {
 
        container
        .append(html)
        .indyMasonry('_newElement');

      });


    });



$('.give-more-content').hide();
// $('.loading-icon').hide();
$('.posts-Over').hide();

  // Meteor.setTimeout(function(){
  //   $('#xLoader').hide();
  //  $(".owl-carousel").owlCarousel({  
  //     autoPlay: 3000, 
  //     items : 5,
  //   });
  // },5500);    


$(function(){ 
  console.log(Session.get('themeName'));
  var theme = Session.get('themeName');
  if(theme === 'theme1'){
    $('#currentTheme').remove(); 
     var themesheet = $('<link href="/theme.css" rel="stylesheet" id="currentTheme1"/>');
     themesheet.appendTo('head');
  }  else{
      $('#currentTheme1').remove();   
  var themesheet = $('<link href="/main.css" rel="stylesheet" id="currentTheme"/>');
  themesheet.appendTo('head');
  }  
});  
  

$('#postIntroduction').offset().top - $('#postasas').offset().top
   
  $('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }

    return true;
  });

  var instance = this;
  if(Session.get("selected_item") === this._id){
    Meteor.defer(function() {  
      $(instance.firstNode).addClass("selected"); //use "instance" instead of "this"
    });
  }
};


