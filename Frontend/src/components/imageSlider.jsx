import { useState } from "react";

export default function ImageSlider(props) {
   
    const images = props.images
    const [currentIndex, setCurrentIndex] = useState(0);
 
    return(
        <div className="w-[450px] h-[400px]">
            <img src={images[currentIndex]} alt="products" className="w-full h-[300px] object-cover" />

            <div className="w-full h-[100px]  flex items-center justify-center shadow-xl">
                {
                    images.map(
                        (image, index) => {
                            return(
                                <img key={index} className={"w-[100px] h-[85px] m-2 rounded-xl object-cover cursor-pointer hover:border hover:border-yellow-950"+(index==currentIndex&& "border-accent border-4")} onClick={
                                    () => {
                                          setCurrentIndex(index)
                                    }
                                } src={image} />
                              
                            )
                        }
                    )
                }
            </div>
        </div>
    )
}