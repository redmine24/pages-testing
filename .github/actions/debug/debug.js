const core = require('@actions/core')
const { Octokit } = require("@octokit/core");


async function run() {
	try {

		// const artifacts = await octokit.request('GET /repos/{owner}/{repo}/actions/artifacts', {
		const token = core.getInput("github_token", { required: true })
		const [owner, repo] = core.getInput("repo", { required: true }).split("/")
		console.log('owner: ' + owner + ', repo: ' + repo);

		const octokit = new Octokit({ auth: process.env.INPUT_TOKEN })
		const artifacts = await octokit.request('GET /repos/'+owner+'/'+repo+'/actions/artifacts', {
		  owner: owner,
		  repo: repo,
		  headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		  }
		});

		console.log(artifacts);

	} catch (error) {
		core.setFailed(error.message);
	}
}

run()
