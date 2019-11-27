import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

const Header = styled.header`
  font-weight: 500;
  color: #333333;

  p {
      font-size: 1.5rem;
  }
`

const PostContainer = styled.div`
  background-color: #FFFFFF;
  display: flex;
  border: 1px solid #CCCCCC;
  border-radius: 3px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0px 2px 4px #CCC;
  transition: all .2s linear;
  
  &:nth-child(even) {
      background-color: #F0F0F0;
  }
  
  &:hover {
      margin-top: -2px;
      transform: translate(0px, -4px);
      box-shadow: none;
      cursor: pointer;
  }

  @media (max-width: 767.98px) {
      flex-direction: column;
  }
`

const Thumbnail = styled.img`
  display: inline-block;
  max-width: 250px;
  max-height: 185px;
  align-self: center;
`

const Content = styled.div`
  display: inline-block;
  border-right: 1px solid #CCCCCC;
  padding: 0 15px;
  width: 100%;

  p {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical; 
  }

  time {
    font-style: italic;
    font-weight: 500;
    svg {
        width: .7rem;
        margin-right: 5px;
    }
  }

  @media (max-width: 767.98px) {
    border-right: none;
  }
`

const Author = styled.div`
  max-width: 200px;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .author-name {
    text-align: center;
    margin: 15px 0;
    font-weight: bold;
    color: #d0524e;
  }

  .author-location {
    svg {
      width: .6rem;
      margin-right: 7px;
    }
  }

  @media (max-width: 767.98px) {
    flex-direction: row;
    align-items: flex-start;
    padding-top: 10px;
    margin-top: 10px;
    border-top: 1px solid #cccccc;
    min-width: 100%;
    
    img {
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }

    .author-name {
      text-align: left;
      margin: initial;
    }

    .author-location {
      text-align: left;
    }

    .author-role {
      font-size: .7rem;
      text-align: left;
    }
  }
`

const PaginationContainer = styled.ul`
  display: flex;
  justify-content: center;
  padding: 0;
`

const PageNumber = styled.li`
  margin: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 35px;
  min-height: 35px;
  background-color: ${props => props.active ? '#c83430' : 'transparent'};
  border-radius: 50%;
  text-align: center;
  color: ${props => props.active ? '#FFFFFF' : 'inherit'};
  
  &:hover {
    cursor: pointer;
    text-decoration: ${props => props.active ? 'none' : 'underline'};
  }

  &:first-child {
    margin-right: 15px;
  }

  &:last-child {
    margin-left: 15px;
  }
`

const PostsSection = styled.section`
  h2 {
    font-size: 1.2rem;
  }
`

export default class Index extends React.Component {
  static async getInitialProps() {
    const { data: { data } } = await axios.get('http://localhost:3000/api/posts?pageSize=8&pageNumber=1')
    const { currentPage, pageSize, from } = data
    const totalPage = Math.ceil(from / pageSize)
    const pagination = Array.from({ length: totalPage }, (value, number) => {
      return ++number
    })
    return { posts: data.posts, currentPage, pageSize, from, pagination }
  }

  render() {
    const { posts, pagination, currentPage } = this.props
    return (
      <div className='container pt-3'>
        <Header>
          <h1>MAQE Forums</h1>
          <p>Subtitle</p>
        </Header>
        <PostsSection>
          <h2>Posts</h2>
          <div className='mt-3'>
            {posts.map(post => (
              <PostContainer key={post.id}>
                <Thumbnail alt={post.title} src={post.image_url} />
                <Content>
                  <h3>
                    {post.title}
                  </h3>
                  <p>
                    {post.body}
                  </p>
                  <time className='text-muted'>
                    <FontAwesomeIcon icon={faClock} size='xs' />
                    <span>{moment(post.created_at).fromNow()}</span>
                  </time>
                </Content>
                <Author>
                  <img alt={post.author.name} src={post.author.avatar_url} />
                  <div>
                    <div>
                      <div className='author-name'>
                        {post.author.name}
                      </div>
                      <div className='author-role'>
                        {post.author.role}
                      </div>
                    </div>
                    <div className='author-location'>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />{post.author.place}
                    </div>
                  </div>
                </Author>
              </PostContainer>
            ))}
          </div>
        </PostsSection>
        <nav>
          <PaginationContainer>
            <PageNumber>
              Previous
            </PageNumber>
            {pagination.map(page => (
              <PageNumber key={`page-${page}`} active={parseInt(currentPage) === parseInt(page) ? true : undefined}>
                {page}
              </PageNumber>
            ))}
            <PageNumber>
              Next
            </PageNumber>
          </PaginationContainer>
        </nav>
      </div>
    )
  }
}