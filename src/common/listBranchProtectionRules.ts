import { getOctokit } from '@actions/github';
import { GraphQlQueryResponseData } from '@octokit/graphql';

import { listBranchProtectionRules as query } from '../graphql/queries';
import { IterableList, makeGraphqlIterator } from './makeGraphqlIterator';

export interface BranchProtectionRule {
  pattern: string;
  requiresStrictStatusChecks: boolean;
}

/**
 * Returns an array containing a repository's configured partial branch
 * protection rules.
 */
export const listBranchProtectionRules = async (
  octokit: ReturnType<typeof getOctokit>,
  repositoryOwner: string,
  repositoryName: string,
): Promise<BranchProtectionRule[]> => {
  const iterator = makeGraphqlIterator<BranchProtectionRule>(octokit, {
    extractListFunction: (
      response: GraphQlQueryResponseData,
    ): IterableList<BranchProtectionRule> =>
      response.repository.branchProtectionRules,
    parameters: {
      pageSize: 100,
      repositoryName,
      repositoryOwner,
    },
    query,
  });

  const branchProtectionRules: BranchProtectionRule[] = [];

  for await (const node of iterator) {
    branchProtectionRules.push(node);
  }

  return branchProtectionRules;
};
