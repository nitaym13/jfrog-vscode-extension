import * as vscode from 'vscode';
import { ContextKeys } from '../../../constants/contextKeys';
import { ScanCacheManager } from '../../../scanCache/scanCacheManager';
import { GeneralInfo } from '../../../types/generalInfo';
import { DependenciesTreeNode } from '../dependenciesTreeNode';
export class RootNode extends DependenciesTreeNode {
    constructor(private _workspaceFolder: string, parent?: DependenciesTreeNode, contextValue?: string) {
        super(new GeneralInfo('', '', [], _workspaceFolder, ''), vscode.TreeItemCollapsibleState.Expanded, parent, contextValue);
    }

    public get workspaceFolder() {
        return this._workspaceFolder;
    }

    /**
     * Sets the root nodes' context to show the update dependency icon if available.
     */
    public setUpgradableDependencies(scanCacheManager: ScanCacheManager) {
        this.children.forEach(child => this.upgradableDependencies(scanCacheManager, child));
    }

    protected upgradableDependencies(scanCacheManager: ScanCacheManager, node: DependenciesTreeNode) {
        if (!node.contextValue) {
            return;
        }
        // Look for issues with fixed versions in direct dependencies.
        const isRootUpgradable: boolean = node.issues
            .toArray()
            .map(issueKey => scanCacheManager.getIssue(issueKey.issue_id))
            .filter(issue => issue)
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .some(issue => issue!.fixedVersions?.length > 0);
        if (isRootUpgradable) {
            node.contextValue += ContextKeys.UPDATE_DEPENDENCY_ENABLED;
        }
    }
}
