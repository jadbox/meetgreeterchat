export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatCaseDescription = (description: string): string => {
  const sections = description.split(/\n{2,}/); // Split on multiple newlines
  
  return sections
    .map(section => {
      // Handle section headers
      if (section.includes('Vital Signs:')) {
        const [header, ...items] = section.split('\n');
        return `\n**${header}**\n${items.join('\n')}`;
      }
      if (section.includes('Examination:')) {
        const [header, ...items] = section.split('\n');
        return `\n**${header}**\n${items.join('\n')}`;
      }
      if (section.includes('Medical History:')) {
        const [header, ...items] = section.split('\n');
        return `\n**${header}**\n${items.join('\n')}`;
      }

      // Format bullet points with proper indentation
      if (section.includes('- ')) {
        return section.split('\n').map(line => {
          if (line.trim().startsWith('- ')) {
            return `  ${line.trim()}`;
          }
          return line;
        }).join('\n');
      }

      return section;
    })
    .join('\n\n'); // Add double line breaks between sections
};