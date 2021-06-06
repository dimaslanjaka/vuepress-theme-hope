import { isLinkHttp } from '@vuepress/shared';

export type RepoType = 'GitHub' | 'GitLab' | 'Bitbucket' | 'Gitee' | null;

export const resolveRepoType = (repo?: string): RepoType =>
    repo
        ? !isLinkHttp(repo) || /github\.com/u.test(repo)
            ? 'GitHub'
            : /bitbucket\.org/u.test(repo)
            ? 'Bitbucket'
            : /gitlab\.com/u.test(repo)
            ? 'GitLab'
            : /gitee\.com/u.test(repo)
            ? 'Gitee'
            : null
        : null;
