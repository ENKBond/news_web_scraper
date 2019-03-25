const db = require("../models");
const cheerio = require("cheerio");
const axios = require("axios");

let results = [];

module.exports = function(app) {

    //get the home page
    app.get("/", function(req, res) {
        res.render("index");
    });

    //GET route for scraping
    app.get("/scrape", function(req, res) {
      // let found;
      // let titleArr = [];
      //   db.Article.find({})
      //     .then(function(dbArticle) {
      //       for (let j=0; j<dbArticle; j++) {
      //         titleArr.push(dbArticle[j].title)
      //       }
            axios.get("http://www.bbc.com/news/").then(function(response) {
              var $ = cheerio.load(response.data);
              $("div.gs-c-promo-body").each(function(i, element) {
                let result = {};
                result.title = $(this)
                .find("h3")
                .text();
                result.link = $(this)
                .find("a")
                .attr("href");
                result.summary = $(this)
                .find("p")
                .text();
                
                if (!found && result.title && result.link && result.summary) {
                  results.push(result);
                }
                
                db.Article.create(result)
                .then(function(dbArticle) {
                  console.log(dbArticle);
                })
                .catch(function(err) {
                  console.log(err);
                });
              });
            });

          // db.Article.find({})
          //   .then(function(dbArticle) {
          //     res.json(dbArticle);
          //   })
          //   .catch(function(err) {
          //     res.json(err);
          //   });
      
          res.render("scrape", {articles: results});
        });
      // });

      //get artilce from db
      app.get("/articles", function(req, res) {
        // TODO: Finish the route so it grabs all of the articles
        db.Article.find({})
          .then(function(dbArticle) {
            res.render("articles");
          })
          .catch(function(err) {
            res.json(err);
          });
      });

      // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/articles/:id", function(req, res) {
        db.Article.findOne({_id: req.params.id})
        .populate("note")
        .then(function(dbArticle) {
          console.log(dbArticle);
          if(dbArticle) {
            res.render("articles", {data: dbArticle});
          }
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  //deleting notes from db

    app.delete("/articles/:id", function(req, res) {
        db.Note.deleteOne({_id: req.params.id})
        .then(function(removed) {
            res.json(removed);
        })
        .catch(function(err, removed) {
            res.json(err);
        });
    });

    //saving or updating a note

    app.post("/articles/:id", function(req, res) {
        db.Note.create(req.body)
            .then(function(dbNote) {
                db.Article.findOneAndUpdate({_id: req.params.id}, {$push: {note: dbNote._id}}, {new: true})
                .then(function(dbArticle) {
                    console.log(dbArticle);
                    res.json(dbArticle);
                })
                .catch(function(err) {
                    res.json(err);
                });
            })
            .catch(function(err) {
                res.json(err);
            });
    });
}