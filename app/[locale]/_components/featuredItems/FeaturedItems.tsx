"use client";
import { useState } from "react";
import FeaturedArticles from "./FeaturedArticles";

const FeaturedItems = ({ items, headline }: any) => {
  const [itemNumber, setItemNumber] =useState(3);
  const onShowMore = ()=>{
    if(itemNumber > items.length) {
      return setItemNumber(items.length)
    } else {

      setItemNumber(itemNumber + 3)
    }
  }
  return (
    <section>
      <h3 className="featured-items__contaainer">
        {headline || "Our featured articles"}
      </h3>
      <div className="featured-items__container">
        {items.slice(0,itemNumber).map((item: any) => (
          <FeaturedArticles key={item.slug} article={item} />
        ))}
      </div>
     
   {
    itemNumber < items.length && (
      <button className=" btn btn--medium btn--turquoise place-self-auto " onClick={onShowMore}>See more</button>
    )
   }
      
        
    </section>
  );
};

export default FeaturedItems;
