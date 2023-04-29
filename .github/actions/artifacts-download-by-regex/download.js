const AdmZip = require('adm-zip')


const core = require('@actions/core')
const { Octokit } = require("@octokit/core");
const { paginateRest } = require('@octokit/plugin-paginate-rest');

const token = core.getInput("github_token", { required: true })
const [owner, repo] = core.getInput("repo", { required: true }).split("/")
const regex = core.getInput("regex", { required: true })

const OctoPag = Octokit.plugin(paginateRest);
const octokit = new OctoPag({ auth: token })

async function list_artifacts() {
	const list = [];
	const artifacts = await octokit.paginate('GET /repos/'+owner+'/'+repo+'/actions/artifacts', {
	  per_page: 100,
	  headers: { 'X-GitHub-Api-Version': '2022-11-28' }
	});
	artifacts.forEach(
		(data) => {
			core.info(`==> found artifact: id: ${data.id} name: ${data.name} size: ${data.size_in_bytes} branch: ${data.workflow_run.head_branch} expired: ${data.expired}`);
			if(data.name.match(regex) && data.expired !== true) { list.push(data); }
		}
	);
	return list;
}

async function download_artifact(id) {
	core.info(`download_artifact(${id})`)
	const artifact = await octokit.request('GET /repos/'+owner+'/'+repo+'/actions/artifacts/'+id+'/zip', { headers: { 'X-GitHub-Api-Version': '2022-11-28' } });
	const zip = new AdmZip(Buffer.from(artifact.data));
	zip.getEntries().forEach((e) => { core.info(`e ${e}`); });
	const entries = zip.getEntries();
	core.info(entries)
	for(let entry of entries) {
		core.info(entry)
		const buffer = entry.getData();
		core.info("File: " + entry.entryName + ", length (bytes): " + buffer.length + ", contents: " + buffer.toString("utf-8"));
	}
}


list_artifacts()
.then (data => {
	if( data.length > 0 ) {
		core.info(`==> got artifacts: ${data.length} items:`);
		data.forEach( (data) => {
			core.info(` - download> id: ${data.id} name: ${data.name} size: ${data.size_in_bytes} branch: ${data.workflow_run.head_branch} expired: ${data.expired}`);
// TODO: is it ok catch in catch? 
			download_artifact(data.id);
		})
	} else { 
		core.info('==> got empty artifactslist');
	}
})
.catch (error => {core.setFailed(error.message)});
