import React from 'react'
import HightlightArticle from '../_components/Blog/HightlightArticle'
import SubscribeToNewsLetter from '../_components/Blog/SubscribeToNewsLetter'

const Blog = () => {
  const highLightArticleData = {
    headline: '3 tips for a super fast takeoff', 
    excerpt: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, ad. Ea velit cum reiciendis quis voluptates modi, fugiat animi laboriosam officia aliquam nostrum, quam quasi architecto harum sed, in autem.",
    slug: "takeoff",
    featuredImage: "/assets/hero-experience.png"
  }
  return (
    <main className='blog-page'>
      <HightlightArticle data={highLightArticleData} />
      <SubscribeToNewsLetter />
    </main>
  )
}

export default Blog
