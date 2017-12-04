
$(function() {
    describe('RSS Feeds', function() {
        /* Make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loop through each feed
         * in the allFeeds object and ensure it has a URL defined
         * and that the URL is not empty.
         */

         it('URL not empty', function() {
           for (i in allFeeds) {
             expect(allFeeds[i].url).toBeDefined();
             expect(allFeeds[i].url.length).not.toBe(0);
           }
         });


        /* Loop through each feed
         * in the allFeeds object and ensure it has a name defined
         * and that the name is not empty.
         */
         it('Names not empty', function() {
           for (i in allFeeds) {
             expect(allFeeds[i].name).toBeDefined();
             expect(typeof allFeeds[i].name).toBe('string');
             expect(allFeeds[i].name).not.toBe('');
           }
         });

    });


    describe('The menu', function() {

        /* Ensure the menu element is
         * hidden by default.
         */
         it('Menu element hidden by default', function() {
           expect($('body').hasClass('menu-hidden')).toEqual(true);
         });

         /* Ensure the menu changes
          * visibility when the menu icon is clicked.
          */
          it('Menu changes visibility on click', function() {
            menuIcon = $('.menu-icon-link');

            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
          });
    });

    describe('Initial Entries', function() {

        /* Ensure when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         beforeEach(function(done) {
           loadFeed(0, function() {
             done();
           });
         });

         it('At least one entry within the feed container', function() {
           expect($('.entry')).toBeDefined();
           expect($('.entry').length).toBeGreaterThan(0);
         })
    });

    describe('New Feed Selection', function() {
      var firstContent;
      var secondContent;

        /* Ensure when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         beforeEach(function(done) {
           loadFeed(1, function() {
             firstContent = $('.feed').html();
             loadFeed(2, function() {
               secondContent = $('.feed').html();
               done();
            });
           });
         });

         //To reload first entry
         afterEach(function() {
           loadFeed(0);
         });

         it('content changes', function() {
           expect(firstContent).toBeDefined();
           expect(secondContent).toBeDefined();
           expect(firstContent).not.toEqual(secondContent);
         });

    });
}());
