const Octokit = require("@octokit/rest");
const fs = require("fs");

//authentication
require("dotenv").config();
const octokit = new Octokit({
  auth: process.env.GITHUB_API_KEY
});

//function to fetch leaderboard
async function getLeaderboard(obj) {
  await octokit.repos.listForOrg({ org: "osdc" }).then(async repos => {
    for (const data of repos.data) {
      const name = data.name;
      await octokit.repos
        .listCommits({ owner: "osdc", repo: name })
        .then(commits => {
          for (const commit of commits.data) {
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
          }
        });
    }
    module.exports.lboard = obj;
  });
}
module.exports = { getLeaderboard };
