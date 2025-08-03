import React, { FC } from "react";
import styles from "./pending-approval.module.scss";

interface PendingApprovalsBoxProps {
    /**
     * Controls the checked state of the checkbox.
     * If true, the checkmark and green line are displayed.
     * If false, only the empty box is shown.
     */
    isChecked?: boolean;
    /**
     * Optional click handler for the entire component.
     */
    onClick?: () => void;
    /**
     * Optional accessible label for the checkbox element.
     * Defaults to "Pending Approvals checkbox".
     */
    ariaLabel?: string;
}

/**
 * A React component to display "Pending Approvals" with a checkbox icon.
 * The component's visual state can be controlled via the `isChecked` prop.
 * It can also be made interactive via the `onClick` prop.
 */
export const PendingApprovalsBox: FC<PendingApprovalsBoxProps> = ({
    isChecked = true, // Default to checked as per the provided image
    onClick,
    ariaLabel = "Pending Approvals checkbox",
}) => {
    return (
        <div
            className={styles.container}
            onClick={onClick}
            role="checkbox"
            aria-checked={isChecked}
            aria-label={ariaLabel}
            tabIndex={onClick ? 0 : -1} // Make focusable if clickable
        >
            <div className={styles.iconWrapper}>
                <svg
                    className={styles.checkboxSvg}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    {/* Checkbox border/background */}
                    <rect
                        x="2.5"
                        y="2.5"
                        width="20"
                        height="20"
                        rx="2"
                        fill="#E0E0E0" /* Light gray background */
                        stroke="#ADADAD" /* Slightly darker border for depth */
                        strokeWidth="1"
                    />
                    {/* Checkmark (only if checked) */}
                    {isChecked && (
                        <path
                            d="M7 12L10.5 16L17.5 8"
                            stroke="#3A567C" /* Dark blue checkmark */
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    )}
                </svg>
            </div>

            <div className={styles.textWrapper}>
                <span className={styles.approvalsText}>Experience</span>
                <span className={styles.pendingText}>New Search</span>
            </div>
        </div>
    );
};
