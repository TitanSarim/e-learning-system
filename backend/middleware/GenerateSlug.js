const generateSlug = (courseTitle, userId) => {
    const replacedTitle = courseTitle.replace(/\s+/g, '-').toLowerCase();
    return `${replacedTitle}-${userId}`;
}

module.exports = {
    generateSlug 
}