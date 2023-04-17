const { Octokit } = require("@octokit/core");

const octokit = new Octokit({
  auth: process.env.INPUT_GITHUB_TOKEN
})


try {

	const artifacts = await octokit.request('GET /repos/{owner}/{repo}/actions/artifacts', {
	  owner: 'OWNER',
	  repo: 'REPO',
	  headers: {
		'X-GitHub-Api-Version': '2022-11-28'
	  }
	});

	console.log(artifacts);

} catch (error) {
	core.setFailed(error.message);
}
