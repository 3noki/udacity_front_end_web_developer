/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
  /* This is our first test - it tests to make sure that the
  * allFeeds variable has been defined and that it is not
  * empty. Experiment with this before you get started on
  * the rest of this project. What happens when you change
  * allFeeds in app.js to be an empty array and refresh the
  * page?
  */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* TODO: Write a test that loops through each feed
    * in the allFeeds object and ensures it has a URL defined
    * and that the URL is not empty.
    */
    it('urls are not empty', function() {
      allFeeds.forEach(function(feed){
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      });
    });

  /* TODO: Write a test that loops through each feed
  * in the allFeeds object and ensures it has a name defined
  * and that the name is not empty.
  */
    it('names are defined and not empty', function() {
      allFeeds.forEach(function(feed){
      expect(feed.name).toBeDefined();
      expect(feed.name.length).not.toBe(0);
      });
    });

  });

  /* TODO: Write a new test suite named "The menu" */
  describe('The menu', function() {

    /* TODO: Write a test that ensures the menu element is
    * hidden by default. You'll have to analyze the HTML and
    * the CSS to determine how we're performing the
    * hiding/showing of the menu element.
    */
      it('is hidden by default', function() {
        //set his variable body to the DOM body element
        var body = $('body');
        //expects this to be hidden by default when page is loaded
        expect(body.hasClass("menu-hidden")).toBe(true);
      });

    /* TODO: Write a test that ensures the menu changes
    * visibility when the menu icon is clicked. This test
    * should have two expectations: does the menu display when
    * clicked and does it hide when clicked again.
    */
    it('changes when clicked', function() {
      //declare body indepentent of last test
      var body = $('body');
      //declare the clickable icon vaiable
      var icon = $('.icon-list');
      //on click, menu appears / class menu-hidden appears
      icon.click();
      expect(body.hasClass("menu-hidden")).toBe(false);
      //on click, menu disappears / class menu-hidden is removed
      icon.click()
      expect(body.hasClass("menu-hidden")).toBe(true);
    });
  });

  /* TODO: Write a new test suite named "Initial Entries" */
  describe('Initial Entries', function() {
    beforeEach(function(done) {
      loadFeed(0, done)
    });

  /* TODO: Write a test that ensures when the loadFeed
  * function is called and completes its work, there is at least
  * a single .entry element within the .feed container.
  * Remember, loadFeed() is asynchronous so this test will require
  * the use of Jasmine's beforeEach and asynchronous done() function.
  */
  let entry = $('.entry');
  let initialComplete = false;

    it('are loaded', function(cb) {
      expect($('.entry').length).toBeGreaterThan(0);
          var self = this;
          setTimeout(function() {
          self.initialComplete = true;
          if (cb) {
              return cb();
          }
          }, 3);

    });
  });

  /* TODO: Write a new test suite named "New Feed Selection" */
  describe('New Feed Selection', function() {

    /* TODO: Write a test that ensures when a new feed is loaded
    * by the loadFeed function that the content actually changes.
    * Remember, loadFeed() is asynchronous.
    */

  let title = [];
  for (var i =0; i < allFeeds.length; i++) {
    asyncLoad(i);
  }

  function asyncLoad(i) {
		describe('feed ' + title[i], function() {
			let currentTitle;
			let previousTitle;
      let currentContent;
      let previousContent;
			beforeEach(function(done) {
				loadFeed(i, done);
			});

			it('changes title and content on load', function() {
				currentTitle = $('.header-title').text();
        currentContent = $('.feed').text;
        title.push($('.header-title').text());
        console.log(title[i]);
        expect(previousContent).not.toMatch(currentContent);
				expect(previousTitle).not.toMatch(currentTitle);
				previousTitle = currentTitle;
        previousContent = currentContent;
			});
		});
	 }

 });

}());
