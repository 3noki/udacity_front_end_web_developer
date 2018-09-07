
  var model = {

    current_cat: null,

    cats: [
      {
        clickCount:0,
        name: 'orange',
        image_src: 'img/cat_picture1.jpg'
      },
      {
        clickCount:0,
        name: 'grey',
        image_src: 'img/cat_picture2.jpeg'
      },
      {
        clickCount:0,
        name: 'kitten',
        image_src: 'img/cat_picture3.jpeg'
      },
      {
        clickCount:0,
        name: 'white',
        image_src: 'img/cat_picture4.jpeg'
      },
      {
        clickCount:0,
        name: 'fluffy',
        image_src: 'img/cat_picture5.jpeg'
      }
    ]

  }


  var octopus = {

    init: function() {
      model.current_cat = model.cats[0];
      cat_view.init();
      list_of_cats.init();
      //admin_console.init();
    },

    returnCurrentCat: function() {
      return model.current_cat;
    },

    returnCats: function() {
      return model.cats;
    },

    setCurrentCat: function(cat) {
      model.current_cat = cat;
      cat_view.render();
    },

    incrementClicks: function() {
      model.current_cat.clickCount++;
      cat_view.render();
    },

    updateCat: function(updatedCat) {
      model.currentCat.name = updatedCat.catname;
      model.currentCat.image_src = updatedCat.catimage;
      model.currentCat.clickCount = updatedCat.catclicks;
      cat_view.render();
      list_of_cats.render();
    }

  }

  var cat_view = {

    init: function() {
      //this.catpicture = document.querySelector('.cat_picture');
      this.catname = document.querySelector('.cat_name');
      this.catclicks = document.querySelector('.clicks');
      this.catimage = document.querySelector('.cat_image');

      this.catimage.addEventListener('click', function() {
        octopus.incrementClicks();
      })

      this.adminname = document.querySelector('.admin_name');
      this.adminimage = document.querySelector('.admin_url');
      this.adminclicks = document.querySelector('.admin_clicks');

      document.querySelector('.admin_button').addEventListener('click', function() {
          document.querySelector('.menu').classList.toggle('visible');
      }, false);

      document.querySelector('.admin_cancel').addEventListener('click', function() {
          document.querySelector('.menu').classList.toggle('visible');
      }, false);

      document.querySelector('.admin_submit').addEventListener('click', function() {
          var adminname = document.querySelector('.admin_name');
          var adminimage = document.querySelector('.admin_url');
          var adminclicks = document.querySelector('.admin_clicks');
          var updatedCat = {
            catname: adminname.value,
            caturl: adminimage.value,
            catclicks: adminclicks.value
          };
          octopus.updateCat(updatedCat);
          document.querySelector('.menu').classList.toggle('visible');
          //cat_view.render();
      }, false);

      this.render();
    },

    render: function(){
      var currentCat = octopus.returnCurrentCat();
      this.catclicks.textContent = currentCat.clickCount;
      this.catname.textContent = currentCat.name;
      this.catimage.src = currentCat.image_src;

      this.adminname.value = currentCat.name;
      this.adminimage.value = currentCat.image_src;
      this.adminclicks.value = currentCat.clickCount;
    }
  }

  var list_of_cats = {

      init: function() {
        this.catlist = document.querySelector('.cat_list');
        this.render();
      },

      render: function() {
        let cat;
        let element;
        let i;
        let cats = octopus.returnCats();
        this.catlist.innerHtml = '';
          for (i = 0; i < cats.length; i++) {
            cat = cats[i];
            element = document.createElement('li');
            element.textContent = cat.name;
            element.addEventListener('click', (function(cat) {
              return function() {
                  octopus.setCurrentCat(cat);
                  cat_view.render();
              }
            })(cat),false);
            this.catlist.appendChild(element);
          }
      }

  }

 octopus.init();
