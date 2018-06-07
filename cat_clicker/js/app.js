
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
      view.init();
      list.init();
    },

    returnCurrentCat: function() {
      return model.current_cat;
    },

    returnCats: function() {
      return model.cats;
    },

    setCurrentCat: function(cat) {
      model.current_cat = cat;
    },

    incrementClicks: function() {
      model.current_cat.clickCount++;
      view.render();
    }

  }

  var view = {

    init: function() {
      //this.catpicture = document.querySelector('.cat_picture');
      this.catname = document.querySelector('.cat_name');
      this.catclicks = document.querySelector('.clicks');
      this.catimage = document.querySelector('.cat_image');

      this.catimage.addEventListener('click', function() {
        octopus.incrementClicks();
      })

      this.render();
    },

    render: function(){
      var currentCat = octopus.returnCurrentCat();
      this.catclicks.textContent = currentCat.clickCount;
      this.catname.textContent = currentCat.name;
      this.catimage.src = currentCat.image_src;
    }
  }

  var list = {

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
          element.addEventListener('click', (function(theCat) {
            return function() {
                octopus.setCurrentCat(theCat);
                view.render();
            }
          })(cat));
          this.catlist.appendChild(element);

        }

      }

  }

 octopus.init();
