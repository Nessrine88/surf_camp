"use client";
import { useState } from "react";
import FeaturedArticles from "./FeaturedArticles";
import FeaturedEvents from "./FeaturedEvent";

const FeaturedItems = ({ items, headline, itemType = "article" }: any) => {
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
      <h3 className="featured-items__container">
        {headline || "Our featured articles"}
      </h3>
      <div className="featured-items__container">
        {items.slice(0,itemNumber).map((item: any) => 
         { if(itemType === "article"){
            return <FeaturedArticles key={item.slug} article={item} />
          } else {
               return <FeaturedEvents key={item.id} event={item} />
          }
        }
        )}
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
