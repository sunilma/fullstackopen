const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs[0].likes
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map((blog) => blog.likes)
    const position = likes.indexOf(Math.max(...likes))
    return blogs[position]
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}