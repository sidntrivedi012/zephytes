const Octokit = require("@octokit/rest");

//authentication
require("dotenv").config();
const octokit = new Octokit({
  auth: process.env.GITHUB_API_KEY
});

//function to fetch leaderboard
async function getLeaderboard(obj) {
  await octokit.repos.listForOrg({ org: "osdc" }).then(async repos => {
    for (const data of repos.data) {
      await octokit.repos
        .listCommits({ owner: "osdc", repo: data.name })
        .then(commits => {
          for (const commit of commits.data) {
            // console.log(commits.data[0]);
            if (commit.author != null) {
              //matching if the username is already taken.
              temp = obj.find(e => e.contributor === commit.author.login);
              if (temp != undefined) {
                temp.commits += 1;
              } else {
                var contributor_data = {
                  contributor: commit.author.login,
                  commits: 1,
                  avatar: commit.author.avatar_url,
                  url: commit.author.html_url
                };
                obj.push(contributor_data);
              }
            }
          }
        });
    }
    obj.sort(function(a, b) {
      return b.commits - a.commits;
    });
    console.log(obj);
    module.exports.lboard = obj;
  });
}
getLeaderboard([]);
module.exports = { getLeaderboard };
