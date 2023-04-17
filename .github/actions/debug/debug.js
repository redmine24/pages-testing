const core = require('@actions/core')
const { Octokit } = require("@octokit/core");
const { paginateRest } = require('@octokit/plugin-paginate-rest');



async function run() {
	try {

		const token = core.getInput("github_token", { required: true })
		const [owner, repo] = core.getInput("repo", { required: true }).split("/")
		const octokit = new Octokit({ auth: token })
		const octpag = Octokit.plugin(paginateRest);


		const artifacts = await octpag.paginate('GET /repos/'+owner+'/'+repo+'/actions/artifacts', {
		  owner: owner,
		  repo: repo,
		  per_page: 10,
		  headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		  }
		}
		);

		console.log(JSON.stringify(artifacts));

	} catch (error) {
		core.setFailed(error.message);
	}
}

run()
