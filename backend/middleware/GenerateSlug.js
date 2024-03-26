const generateSlug = (courseTitle, userId) => {
    const replacedTitle = courseTitle.replace(/\s+/g, '-').toLowerCase();
    const currentTime = Date.now(); // Get current timestamp
    return `${replacedTitle}-${userId}-${currentTime}`;
}

module.exports = {
    generateSlug 
}