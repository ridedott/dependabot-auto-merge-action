const pullRequestFields = `{
  author {
    login
  }
  commits(last: 1) {
    edges {
      node {
        commit {
          author {
            name
          }
          messageHeadline
          message
        }
      }
    }
  }
  id
  mergeable
  merged
  number
  reviews(last: 1, states: APPROVED) {
    edges {
      node {
        state
      }
    }
  }
  state
  title
}`;

export const findPullRequestsInfoByReferenceName = `
  query FindPullRequestsInfoByReferenceName($repositoryOwner: String!, $repositoryName: String!, $referenceName: String!) {
    repository(owner: $repositoryOwner, name: $repositoryName) {
      pullRequests(headRefName: $referenceName, first: 1) {
        nodes ${pullRequestFields}
      }
    }
  }
`;

export const findPullRequestInfoByNumber = `
  query FindPullRequestInfoByNumber($repositoryOwner: String!, $repositoryName: String!, $pullRequestNumber: Int!) {
    repository(owner: $repositoryOwner, name: $repositoryName) {
      pullRequest(number: $pullRequestNumber) ${pullRequestFields}
    }
  }
`;

export const findPullRequestCommits = `
  query FindPullRequestsInfoByReferenceName($repositoryOwner: String!, $repositoryName: String!, $pullRequestNumber: Int!, $pageSize: Int!, $endCursor: String) {
    repository(owner: $repositoryOwner, name: $repositoryName) {
      pullRequest(number: $pullRequestNumber) {
        commits(first: $pageSize, after: $endCursor) {
          edges {
            node {
              commit {
                author {
                  user {
                    login
                  }
                }
                signature {
                  isValid
                }
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  }
`;

export const listBranchProtectionRules = `
query($endCursor: String, $pageSize: Int!, $repositoryName: String!, $repositoryOwner: String!) {
  repository(name: $repositoryName, owner: $repositoryOwner) {
    branchProtectionRules(first: $pageSize, after: $endCursor) {
      edges {
        node {
          pattern
          requiresStrictStatusChecks
        }
      }
    }
  }
}
`;
