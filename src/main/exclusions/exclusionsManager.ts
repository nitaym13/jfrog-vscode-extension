import { ExtensionComponent } from '../extensionComponent';
import { DependenciesTreeNode } from '../treeDataProviders/dependenciesTree/dependenciesTreeNode';
import { TreesManager } from '../treeDataProviders/treesManager';
import { AbstractExclusion } from './abstractExclusion';
import { MavenExclusion } from './mavenExclusion';
/**
 * Exclude the dependency in the project descriptor (i.e pom.xml) file after right click on the components tree and a left click on "Exclude dependency".
 */
export class ExclusionsManager implements ExtensionComponent {
    private _exclusions: AbstractExclusion[] = [];

    constructor(treesManager: TreesManager) {
        this._exclusions.push(new MavenExclusion(treesManager));
    }

    public activate() {
        return this;
    }

    public excludeDependency(dependenciesTreeNode: DependenciesTreeNode) {
        this._exclusions
            .filter(exclusion => exclusion.isMatched(dependenciesTreeNode))
            .forEach(exclusion => exclusion.excludeDependency(dependenciesTreeNode));
    }
}
