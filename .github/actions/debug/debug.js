const core = require('@actions/core')
const { Octokit } = require("@octokit/core");
const { paginateRest } = require('@octokit/plugin-paginate-rest');


const OctoPag = Octokit.plugin(paginateRest);

async function run() {
	try {

		const token = core.getInput("github_token", { required: true })
		const [owner, repo] = core.getInput("repo", { required: true }).split("/")
		const octokit = new OctoPag({ auth: token })

		const artifacts = await octokit.paginate('GET /repos/'+owner+'/'+repo+'/actions/artifacts', {
		  owner: owner,
		  repo: repo,
		  per_page: 100,
		  headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		  }
		}
		);

		//console.log(JSON.stringify(artifacts));
		console.log(artifacts);

	} catch (error) {
		core.setFailed(error.message);
	}
}

run()
