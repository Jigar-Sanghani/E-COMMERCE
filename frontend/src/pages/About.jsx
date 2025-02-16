import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newslaterbox from '../components/Newslaterbox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Discover the latest fashion trends with our online clothing store! From casual wear to elegant outfits, we offer a wide range of stylish and high-quality apparel for men, women, and kids. Shop effortlessly with easy navigation, secure payments, and fast delivery. Elevate your wardrobe today!</p>
          <p>Step into a world of fashion with our premium e-commerce clothing store! We bring you trendy, comfortable, and affordable clothing for every occasion. Whether you're looking for everyday essentials or statement pieces, our collection has something for everyone. Shop now and redefine your style!</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>We are dedicated to redefining fashion by offering high-quality, stylish, and affordable clothing that empowers individuals to express their unique personalities. Our mission is to provide a seamless and enjoyable shopping experience, with a curated selection of trendy and timeless pieces for every occasion.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance :</b>
          <p className='text-gray-600'>We take quality seriously. Our commitment to excellence ensures that every piece of clothing meets the highest standards of durability, comfort, and style.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience :</b>
          <p className='text-gray-600'>We believe that shopping for high-quality clothing should be effortless. That’s why we ensure both premium craftsmanship and a hassle-free shopping experience.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service :</b>
          <p className='text-gray-600'>We are dedicated to providing not only high-quality fashion but also an effortless shopping experience backed by exceptional customer service</p>
        </div>
      </div>

      <Newslaterbox/>

    </div>
  )
}

export default About