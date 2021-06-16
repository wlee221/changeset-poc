# changeset-poc

This is a POC for using [changesets](https://github.com/atlassian/changesets) to implement continuous deployment.

### Workflow

1. On PR, customer generates changesets using `changesets` CLI. Here's an example: [link](https://github.com/wlee221/changeset-poc/blob/11ae4b446f5e860a128d9670669b594daa576e5c/.changeset/breezy-clouds-pump.md).

This contains the version bump information and the changelog. This will be consumed later on the release step to version and generate changelog.

2. On PR, maintainers can make an "experimental", preview release. 

Adding a `preview-release` label on a pull request triggers a preview release. This will make a snapshot (tagged) release to npm, that contributors can use for testing or to unblock customers. Upon snapshot release, github actions will comment with the installation script and remove the label. 

Removing the label is a security measure -- we want to be release only the code change that we evaluated to be safe. To make a release on subsequent commits, maintainer needs to reevaluate the code and re-add the label to trigger another release. See [#22](https://github.com/wlee221/changeset-poc/pull/22) for example.

3. Upon merge, we will release this to `next` (similiar to `unstable`). 

This is not implemented in the POC. But it'd follow the same procedure as preview release and be tagged "next".

4. Upon merge, `changesets` [github actions](https://github.com/changesets/action) will be run. 

This will update the "Version Packages" PR, which consumes all the current changesets, bump versions, and update the changelog. [#22](https://github.com/wlee221/changeset-poc/pull/22) is an example of actions-generated PR.

5. Merging the "Version Packages" PR will trigger a release to `stable`. 

This is done through the same `changesets` [github actions](https://github.com/changesets/action).

### Developer Experience

`Changeset` comes with a github bot that comments on each PR whether it has a changeset added and how to add one if not. It also gives you a link that generates a changeset automatically based on the pull request context.

![Screen Shot 2021-06-15 at 5 02 19 PM](https://user-images.githubusercontent.com/43682783/122138374-76e2ea00-cdfb-11eb-8d50-edd9f36a8e56.png)
