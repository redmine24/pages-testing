# pages-testing

# requirements

* everty run in any branch should generate artifact with test reports 
* manual or scheduled workflow for updating github pages with current report state
* branch deletion inkoves the deletion of all artifacts generated with this branch and runs a workflow to update github pages

# mandatory

* generate and publish reports using only artifacts with names starting with "report-"
* automatically remove all artifacts with names starting with 'report-' when their respective branch is deleted
