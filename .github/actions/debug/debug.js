const core = require('@actions/core')
const { Octokit } = require("@octokit/core");

const octokit = new Octokit({
  auth: process.env.INPUT_GITHUB_TOKEN
})

try {

	// const artifacts = await octokit.request('GET /repos/{owner}/{repo}/actions/artifacts', {
	const [owner, repo] = core.getInput("repo", { required: true }).split("/")
	const artifacts = octokit.request('GET /repos/{owner}/{repo}/actions/artifacts', {
	  owner: 'OWNER',
	  repo: 'REPO',
	  headers: {
		'X-GitHub-Api-Version': '2022-11-28'
	  }
	});

	console.log(artifacts);
	console.log('owner: ' + owner + ', repo: ' + repo);

} catch (error) {
	core.setFailed(error.message);
}
