import * as path from 'path';
import { ScanUtils } from './scanUtils';

export class IconsPaths {
    // Icons severities
    static readonly NORMAL_SEVERITY: string = IconsPaths.getIconPath('normal');
    static readonly PENDING_SEVERITY: string = IconsPaths.getIconPath('unknown');
    static readonly UNKNOWN_SEVERITY: string = IconsPaths.getIconPath('unknown');
    static readonly INFORMATION_SEVERITY: string = IconsPaths.getIconPath('low');
    static readonly LOW_SEVERITY: string = IconsPaths.getIconPath('low');
    static readonly MEDIUM_SEVERITY: string = IconsPaths.getIconPath('medium');
    static readonly HIGH_SEVERITY: string = IconsPaths.getIconPath('high');
    static readonly CRITICAL_SEVERITY: string = IconsPaths.getIconPath('critical');

    // Hover severities
    static readonly UNKNOWN_HOVER_SEVERITY: string = IconsPaths.getIconPath('unknownHover');
    static readonly LOW_HOVER_SEVERITY: string = IconsPaths.getIconPath('lowHover');
    static readonly MEDIUM_HOVER_SEVERITY: string = IconsPaths.getIconPath('mediumHover');
    static readonly HIGH_HOVER_SEVERITY: string = IconsPaths.getIconPath('highHover');
    static readonly CRITICAL_HOVER_SEVERITY: string = IconsPaths.getIconPath('criticalHover');

    // Icons builds status
    static readonly BUILD_SUCCESS: string = IconsPaths.getIconPath('normal');
    static readonly BUILD_FAILED: string = IconsPaths.getIconPath('critical');
    static readonly BUILD_UNKNOWN: string = IconsPaths.getIconPath('unknown');

    // License
    static readonly VIOLATED_LICENSE: string = IconsPaths.getIconPath('violatedLicense');

    private static getIconPath(iconName: string) {
        return path.join(ScanUtils.RESOURCES_DIR, iconName + '.png');
    }
}
