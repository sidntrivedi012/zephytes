const Octokit = require("@octokit/rest");
// const fs = require("fs");

//authentication
require("dotenv").config();
const octokit = new Octokit({
  auth: process.env.GITHUB_API_KEY
});

//object array declaration
let obj = [];

//function to fetch leaderboard
function getLeaderboard() {
  return new Promise((resolve, reject) => {
    octokit.repos.listForOrg({ org: "osdc" }).then(repos => {
      repos.data.forEach(({ name }) => {
        octokit.repos
          .listCommits({ owner: "osdc", repo: name })
          .then(commits => {
            commits.data.forEach(commit => {
              commit_author = commit.commit.author.name;
              temp = obj.find(e => e.contributor === commit_author);
              if (temp != undefined) {
                temp.commits += 1;
              } else {
                var contributor_data = {
                  contributor: commit_author,
                  commits: 1
                };
                obj.push(contributor_data);
              }
              obj.sort(function(a, b) {
                return b.commits - a.commits;
              });
              resolve(obj);
            });
          });
      });
    });
  });
}

module.exports = { getLeaderboard };

// fs.writeFile("final.json", JSON.stringify(obj), function(err) {
//   if (err) throw err;
// });
