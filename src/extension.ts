import * as vscode from 'vscode';
import { CodeLensManager } from './main/codeLens/codeLensManager';
import { CommandManager } from './main/commands/commandManager';
import { ConnectionManager } from './main/connect/connectionManager';
import { DiagnosticsManager } from './main/diagnostics/diagnosticsManager';
import { FilterManager } from './main/filter/filterManager';
import { FocusManager } from './main/focus/focusManager';
import { ExclusionsManager } from './main/exclusions/exclusionsManager';
import { HoverManager } from './main/hover/hoverManager';
import { ScanCacheManager } from './main/scanCache/scanCacheManager';
import { TreesManager } from './main/treeDataProviders/treesManager';
import { WatcherManager } from './main/watchers/watcherManager';
import { LogManager } from './main/log/logManager';
import { DependencyUpdateManager } from './main/dependencyUpdate/dependencyUpdateManager';
import { BuildsManager } from './main/builds/buildsManager';
import { ScanLogicManager } from './main/scanLogic/scanLogicManager';

/**
 * This method is called when the extension is activated.
 * @param context - The extension context
 */
export async function activate(context: vscode.ExtensionContext) {
    let workspaceFolders: vscode.WorkspaceFolder[] = vscode.workspace.workspaceFolders || [];

    let logManager: LogManager = new LogManager().activate();
    let connectionManager: ConnectionManager = await new ConnectionManager(logManager).activate(context);
    let scanCacheManager: ScanCacheManager = new ScanCacheManager().activate(context);
    let scanLogicManager: ScanLogicManager = new ScanLogicManager(connectionManager, scanCacheManager, logManager).activate();
    let treesManager: TreesManager = await new TreesManager(
        workspaceFolders,
        connectionManager,
        scanCacheManager,
        scanLogicManager,
        logManager
    ).activate(context);
    let filterManager: FilterManager = new FilterManager(treesManager).activate();
    let focusManager: FocusManager = new FocusManager().activate();
    let exclusionManager: ExclusionsManager = new ExclusionsManager(treesManager).activate();
    let dependencyUpdateManager: DependencyUpdateManager = new DependencyUpdateManager(scanCacheManager).activate();
    let buildsManager: BuildsManager = new BuildsManager(treesManager).activate();

    new DiagnosticsManager(treesManager).activate(context);
    new WatcherManager(treesManager).activate(context);
    new HoverManager(treesManager).activate(context);
    new CodeLensManager().activate(context);
    new CommandManager(
        logManager,
        connectionManager,
        treesManager,
        filterManager,
        focusManager,
        exclusionManager,
        dependencyUpdateManager,
        buildsManager
    ).activate(context);
}
