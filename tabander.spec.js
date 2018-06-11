const http = require('http');
const app = require('./server');
const Browser = require('zombie');
const assert = require('assert');

describe('Tabander test', function () {

    let server, browser;

    function createServerHead(){
        server = http.createServer(app.appHeader).listen(5000);
        openBrowser();
    }

    function createServerBody(){
        server = http.createServer(app.appBody).listen(5000);
        openBrowser();
    }

    function openBrowser(){
        browser = new Browser({site: 'http://localhost:5000'});
    }

    afterEach(function(){
        browser.tabs.closeAll();
        server.close();
    });

    it("should have defined headless browser for script in a body", function(next){
        createServerBody();
        expect(typeof browser !== 'undefined').toBe(true);
        expect(browser instanceof Browser).toBe(true);
        next();
    });

    it('should redirect to tab, script in a body', function(next){
            createServerBody();
            browser.visit('/', function(err) {
                browser
                    .pressButton('button', function(res) {
                        expect(browser.tabs[1]).not.toBe(undefined);
                        next();
                    });
            });
    });

    it("should have defined headless browser for script in a head", function(next){
        createServerHead();
        expect(typeof browser !== 'undefined').toBe(true);
        expect(browser instanceof Browser).toBe(true);
        next();
    });

    it('should redirect to tab, script in a head', function(next){
        createServerHead();
        browser.visit('/', function(err) {
            browser
                .pressButton('button', function(res) {
                    expect(browser.tabs[1]).not.toBe(undefined);
                    next();
                });
        });
    });
});