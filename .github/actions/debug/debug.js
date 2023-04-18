const core = require('@actions/core')
const { Octokit } = require("@octokit/core");
const { paginateRest } = require('@octokit/plugin-paginate-rest');

const token = core.getInput("github_token", { required: true })
const [owner, repo] = core.getInput("repo", { required: true }).split("/")

const OctoPag = Octokit.plugin(paginateRest);
const octokit = new OctoPag({ auth: token })

async function run() {
	const list = [];
	const artifacts = await octokit.paginate('GET /repos/'+owner+'/'+repo+'/actions/artifacts', {
	  owner: owner,
	  repo: repo,
	  per_page: 100,
	  headers: {
		'X-GitHub-Api-Version': '2022-11-28'
	  }
	});
	artifacts.forEach(
		(data) => {
			core.info(`==> found artifact: ${data.id}`);
			if(data.expired !== true) {
				list.push(data);
			}
		}
	);
	return list;
}

run()
.then (data => {
	core.info(`==> got artifacts: ${data.length} items:${data}`);
})
.catch (error => {core.setFailed(error.message)});
