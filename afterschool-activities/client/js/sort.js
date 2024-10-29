function sortLessons(criteria, order) {
    lessons.sort((a, b) => {
        if (criteria === 'price') {
            return order === 'asc' ? a.price - b.price : b.price - a.price;
        } else if (criteria === 'title') {
            return order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        } else if (criteria === 'location') {
            return order === 'asc' ? a.location.localeCompare(b.location) : b.location.localeCompare(a.location);
        } else if (criteria === 'spaces') {
            return order === 'asc' ? a.spaces - b.spaces : b.spaces - a.spaces;
        } else if (criteria === 'rating') {
            return order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        }
        return 0;
    });
    displayLessons();
}
