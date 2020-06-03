const core = require('@actions/core');
const github = require('@actions/github');
const path = require('path');

const packageJson = require(path.resolve(
    process.env.GITHUB_WORKSPACE,
    'package.json'
));

const currentRef = process.env.GITHUB_REF;
const releaseBranches = packageJson.release.branches;
const currentBranch = releaseBranches
                        .find(branch => currentRef.includes(branch.name));

const currentTag = releaseBranches
                    .filter(branch => branch.channel !== undefined)
                    .find(branch => currentRef.includes(branch.channel))

let channel = 'latest';

if (!currentBranch && currentTag) {
    channel = currentTag.channel;
} else if (currentBranch && currentBranch.name !== 'master') {
    channel = currentBranch.channel
}

core.exportVariable('RELEASE_CHANNEL', channel);