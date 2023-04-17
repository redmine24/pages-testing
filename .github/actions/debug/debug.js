const artifact = require('@actions/artifact');
const artifactClient = artifact.create();

try {
//// `who-to-greet` input defined in action metadata file
//const nameToGreet = core.getInput('who-to-greet');
//console.log(`Hello ${nameToGreet}!`);
//const time = (new Date()).toTimeString();
//core.setOutput("time", time);
//// Get the JSON webhook payload for the event that triggered the workflow
//const payload = JSON.stringify(github.context.payload, undefined, 2)
//console.log(`The event payload: ${payload}`);
	const downloadResponse = artifactClient.downloadAllArtifacts();
	//const downloadResponse = await artifactClient.downloadAllArtifacts();

	for (response in downloadResponse) {
		console.log(response.artifactName);
		console.log(response.downloadPath);
	}
} catch (error) {
	core.setFailed(error.message);
}
