import React from 'react'
import { useState } from 'react'

const SingleImage = ({ url, imageClass}) => {

    const [image, loadImage] = useState(false);

    return(
        <>
            <img className={`${imageClass} ${image ? "" : 'hidden-image'} smooth-image` } src={url} onLoad={() => loadImage(true)}/>
            {!image ? <img className={`${imageClass} preloaded-image`}></img> : null}
        </>
    )
}

export default SingleImage;