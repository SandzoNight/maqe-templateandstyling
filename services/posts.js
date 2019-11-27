import authorRepository from '../repositories/authors'
import postRepository from '../repositories/posts'

const getAllPosts = async (pageNumber, pageSize) => {
    const posts = await postRepository.findAllPosts(pageNumber, pageSize)
    const allPosts = (await postRepository.findAllPosts()).length
    await posts.map(async (post) => {
        post.author = await authorRepository.findAuthorById(post.author_id)
    })
    return {
        posts,
        currentPage: pageNumber,
        pageSize: pageSize,
        from: allPosts,
    }
}

export default {
    getAllPosts,
}