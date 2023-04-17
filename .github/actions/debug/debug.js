const core = require('@actions/core')
const { Octokit } = require("@octokit/core");
const { paginateRest } = require('@octokit/plugin-paginate-rest');


const OctoPag = Octokit.plugin(paginateRest);

async function run() {
	const token = core.getInput("github_token", { required: true })
	const [owner, repo] = core.getInput("repo", { required: true }).split("/")
	const octokit = new OctoPag({ auth: token })

	let data = await octokit.paginate('GET /repos/'+owner+'/'+repo+'/actions/artifacts', {
	  owner: owner,
	  repo: repo,
	  per_page: 100,
	  headers: {
		'X-GitHub-Api-Version': '2022-11-28'
	  }
	});
	return data;
}


const data = run();
console.log(data);

	//core.setFailed(error.message);
