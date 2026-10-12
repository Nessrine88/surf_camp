import React from 'react'
import HightlightArticle from '../_components/Blog/HightlightArticle'
import SubscribeToNewsLetter from '../_components/Blog/SubscribeToNewsLetter'
import FeaturedItems from '../_components/featuredItems/FeaturedItems'

const Blog = () => {
  const highLightArticleData = {
    headline: '3 tips for a super fast takeoff', 
    excerpt: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem, ad. Ea velit cum reiciendis quis voluptates modi, fugiat animi laboriosam officia aliquam nostrum, quam quasi architecto harum sed, in autem.",
    slug: "takeoff",
    featuredImage: "/assets/hero-experience.png"
  }

  const featuredArticles = [
    {
      headline: "Surfboard shaping and design behind me scenes of crafting the perfect board",
      slug: "/blog/whatever",
      date: "Monday, 05th of June 2023",
      featuredImage: "/assets/hero-experience.png"
    },
     {
      headline: "Surfboard shaping and design behind me scenes of crafting the perfect board",
      slug: "/blog/whatever",
      date: "Monday, 05th of June 2023",
      featuredImage: "/assets/hero-experience.png"
    },
     {
      headline: "Surfboard shaping and design behind me scenes of crafting the perfect board",
      slug: "/blog/whatever",
      date: "Monday, 05th of June 2023",
      featuredImage: "/assets/hero-experience.png"
    },
     {
      headline: "Surfboard shaping and design behind me scenes of crafting the perfect board",
      slug: "/blog/whatever",
      date: "Monday, 05th of June 2023",
      featuredImage: "/assets/hero-experience.png"
    },
     {
      headline: "Surfboard shaping and design behind me scenes of crafting the perfect board",
      slug: "/blog/whatever",
      date: "Monday, 05th of June 2023",
      featuredImage: "/assets/hero-experience.png"
    },
     {
      headline: "Surfboard shaping and design behind me scenes of crafting the perfect board",
      slug: "/blog/whatever",
      date: "Monday, 05th of June 2023",
      featuredImage: "/assets/hero-experience.png"
    },
  ]
  return (
    <main className='blog-page'>
      <HightlightArticle data={highLightArticleData} />
      <SubscribeToNewsLetter />
      <FeaturedItems items={featuredArticles} />
    </main>
  )
}

export default Blog
