import React from 'react'
import FeaturedArticles from './FeaturedArticles'

const FeaturedItems = ({items, headline}:any) => {
  return (
    <section>
<h3 className='featured-items__contaainer'>
    {headline || "Our featured articles"}
</h3>
<div className='featured-items__container'>
    {items.map((item:any)=>(
      <FeaturedArticles key={item.slug} article={item} />
    ))}
</div>
    </section>
  )
}

export default FeaturedItems