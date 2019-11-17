const Octokit = require("@octokit/rest");
// const fs = require("fs");
require("dotenv").config();
const octokit = new Octokit({
  auth: process.env.GITHUB_API_KEY
});
var f = 0;
let obj = [];
function getLeaderboard() {
  return new Promise((resolve, reject) => {
    octokit.repos.listForOrg({ org: "osdc" }).then(repos => {
      repos.data.forEach(({ name }) => {
        octokit.repos
          .listCommits({ owner: "osdc", repo: name })
          .then(commits => {
            commits.data.forEach(commit => {
              author = commit.commit.author.name;
              temp = obj.find(e => e.contributor === author);
              if (this.temp != undefined) {
                temp.commits += 1;
              } else {
                console.log("data");
                var contributor_data = {
                  contributor: commit.commit.author.name,
                  commits: 1
                };
                obj.push(contributor_data);
              }
              obj.sort(function(a, b) {
                return b.commits - a.commits;
              });

              // fs.writeFile("final.json", JSON.stringify(obj), function(err) {
              //   if (err) throw err;
              // });
            });
          });
      });
    });
  });
}

module.exports = { getLeaderboard };
