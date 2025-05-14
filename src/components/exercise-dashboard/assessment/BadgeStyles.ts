
export const BadgeStyles = {
  getMechanismBadgeStyle: (mechanism: string): string => {
    const styles = {
      'nociceptive': 'bg-blue-100 text-blue-800',
      'neuropathic': 'bg-blue-100 text-blue-800',
      'central': 'bg-blue-100 text-blue-800',
      'none': 'bg-blue-100 text-blue-800'
    };
    
    return styles[mechanism as keyof typeof styles] || 'bg-blue-100 text-blue-800';
  },
  
  getDifferentialBadgeStyle: (differential: string): string => {
    return 'bg-purple-100 text-purple-800';
  }
};
