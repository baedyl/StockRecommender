// Accessibility utility functions for styling

/**
 * Get accessibility-aware styles based on system settings
 */
export const getAccessibilityStyles = () => {
  // Note: In a real implementation, you would check these values
  // For now, we'll provide default styles that work well for accessibility
  
  return {
    // High contrast text styles
    highContrastText: { 
      fontWeight: 'bold' as const,
      color: '#000000'
    },
    
    // High contrast border styles
    highContrastBorder: { 
      borderWidth: 2,
      borderColor: '#000000'
    },
    
    // Large text styles for better readability
    largeText: {
      fontSize: 18,
      lineHeight: 24
    },
    
    // Focus styles for interactive elements
    focusStyle: {
      borderWidth: 3,
      borderColor: '#007AFF',
      borderRadius: 4
    },
    
    // Button styles optimized for accessibility
    accessibleButton: {
      minHeight: 44, // Minimum touch target size
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8
    },
    
    // Input styles optimized for accessibility
    accessibleInput: {
      minHeight: 44,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 2,
      borderColor: '#007AFF',
      borderRadius: 4
    }
  };
};

/**
 * Get color scheme that works well for accessibility
 */
export const getAccessibleColors = () => {
  return {
    // High contrast colors
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    
    // Text colors with good contrast
    textPrimary: '#000000',
    textSecondary: '#3C3C43',
    textTertiary: '#787880',
    
    // Background colors
    backgroundPrimary: '#FFFFFF',
    backgroundSecondary: '#F2F2F7',
    
    // Recommendation colors
    buy: '#34C759',
    sell: '#FF3B30',
    hold: '#FF9500'
  };
};

/**
 * Get spacing that works well for accessibility
 */
export const getAccessibleSpacing = () => {
  return {
    // Minimum touch target spacing
    touchTarget: 44,
    
    // Standard spacing
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    
    // Component spacing
    componentSpacing: 16,
    sectionSpacing: 24
  };
}; 