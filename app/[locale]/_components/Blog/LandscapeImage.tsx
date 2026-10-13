import { extractImageUrl } from '@/utils/stapi-utils';
import React from 'react'

const LandscapeImage = ({imageData}:any) => {
  const {imageCaption, image} = imageData;
  return (
    <div className='article-image mt-10!'>
      <img src={extractImageUrl(image)} alt="" />
      {imageCaption && (
        <p className='copy article-image__caption copy-small'>{imageCaption} </p>
      )}

    </div>
  )
}

export default LandscapeImage