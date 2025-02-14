import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { ShopContext } from '../context/ShopContext'

const Collection = () => {

  const { products, search, showsearch } = useContext(ShopContext)
  const [showfilter, setshowfilter] = useState(false)
  const [filterproducts, setfilterproducts] = useState([])
  const [category, setcategory] = useState([])
  const [subcategory, setsubcategory] = useState([])
  const [sorttype, setsorttype] = useState('relavent')

  const toggleCategory = (e) => {

    const selectedValue = e.target.value;

    if (category.includes(selectedValue)) {
      setcategory(prev => prev.filter(item => item !== selectedValue))
    }

    else {
      setcategory(prev => [...prev, selectedValue])
    }
  }

  const toggleSubcategory = (e) => {

    const selectedValue = e.target.value;
    if (subcategory.includes(selectedValue)) {
      setsubcategory(prev => prev.filter(item => item !== selectedValue))
    }

    else {
      setsubcategory(prev => [...prev, selectedValue])
    }

  }

  const applyfilter = () => {

    let productscopy = products.slice()

    if (search && showsearch) {
      productscopy = productscopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.price.toString().includes(search)
      );
    }


    if (category.length > 0) {
      productscopy = productscopy.filter(item => category.includes(item.category))
    }

    if (subcategory.length > 0) {
      productscopy = productscopy.filter(item => subcategory.includes(item.subcategory));
    }

    setfilterproducts(productscopy)
  }

  const sortproduct = () => {

    let fpcopy = filterproducts.slice()

    switch (sorttype) {

      case 'low-high':
        setfilterproducts(fpcopy.sort((a, b) => (a.price - b.price)))
        break;

      case 'high-low':
        setfilterproducts(fpcopy.sort((a, b) => (b.price - a.price)))
        break;

      default:
        applyfilter()
        break;

    }

  }

  useEffect(() => {
    applyfilter()
  }, [category, subcategory, search, showsearch])

  useEffect(() => {
    sortproduct()
  }, [sorttype])


  return (

    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t '>

      {/* Filter Options */}

      <div className='min-w-60'>

        <p onClick={() => setshowfilter(!showfilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showfilter ? 'rotate-90' : ''}`} alt="" />
        </p>

        {/* Category Filter */}

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' : 'hidden'} sm:block`}>

          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} /> Men
            </p>

            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory} /> Women
            </p>

            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory} /> Kids
            </p>

          </div>

        </div>

        {/* Subcategory Filter */}

        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showfilter ? '' : 'hidden'} sm:block`}>

          <p className='mb-3 text-sm font-medium'>TYPE</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubcategory} /> Topwear
            </p>

            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubcategory} /> Bottomwear
            </p>

            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubcategory} /> Winterwear
            </p>


          </div>

        </div>

      </div>

      {/* Right Side */}

      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>

          <Title text1={'ALL'} text2={'COLLECTION'} />

          {/* Product Sort  */}

          <select onChange={(e) => setsorttype(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by : Relavent</option>
            <option value="low-high">Sort by : Low To High</option>
            <option value="high-low">Sort by : High To Low</option>
          </select>

        </div>

        {/* Map Produts */}

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterproducts.map((item, index) => (
              <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default Collection