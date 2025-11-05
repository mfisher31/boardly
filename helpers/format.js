module.exports = {
    /**
     * Truncates text to a specified length or at the first newline, whichever comes first.
     * @param {string} text - The text to truncate
     * @param {number} [length=30] - Maximum length before truncation
     * @returns {string} The truncated text with '...' appended, or '-' if text is falsy
     */
    formatDescription: (text, length = 30) => {
        if (!text || typeof text != 'string' || text.trim().length <= 0) 
            return '-';

        text = text.trim()

        const newlineIndex = text.indexOf('\n');
        if (newlineIndex !== -1 && newlineIndex < length)
            return text.substring(0, newlineIndex) + '...';
        
        if (text.length < length)
            return text;
        
        return text.length > length ? text.substring(0, length) + '...' : text;
    }
}
