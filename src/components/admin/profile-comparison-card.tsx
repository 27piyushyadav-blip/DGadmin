import { ProfileChange } from "@/types/admin";
import { Badge } from "@/components/ui/badge";
import { Check, X, ArrowRight } from "lucide-react";

interface ProfileComparisonCardProps {
  changes: ProfileChange[];
  onApprove?: () => void;
  onReject?: () => void;
  onApproveChange?: (field: string) => void;
  onRejectChange?: (field: string) => void;
}

export function ProfileComparisonCard({
  changes,
  onApprove,
  onReject,
  onApproveChange,
  onRejectChange
}: ProfileComparisonCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-2">Profile Changes</h3>
        <p className="text-sm text-muted-foreground">
          Review the changes requested for this profile
        </p>
      </div>

      <div className="p-6 space-y-4">
        {changes.map((change, index) => (
          <div key={index} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-foreground capitalize">
                {change.field.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onApproveChange?.(change.field)}
                  className="p-1 rounded hover:bg-green-100 dark:hover:bg-green-900/20 text-green-600"
                  title="Approve this change"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onRejectChange?.(change.field)}
                  className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600"
                  title="Reject this change"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Current Value</p>
                <div className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-sm text-red-900 dark:text-red-100">
                    {change.oldValue || 'Empty'}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-1">New Value</p>
                <div className="p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-md">
                  <p className="text-sm text-green-900 dark:text-green-100">
                    {change.newValue || 'Empty'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-3">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>

      {(onApprove || onReject) && (
        <div className="p-6 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Approve all changes to update the profile
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onReject}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
            >
              Reject All
            </button>
            <button
              onClick={onApprove}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Approve All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
