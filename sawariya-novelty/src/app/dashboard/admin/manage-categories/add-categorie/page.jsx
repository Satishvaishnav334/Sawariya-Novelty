'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useUserDataContext } from '@/components/context/UserContext'

function CreateCategoryPage() {
  const { user } = useUserDataContext()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [isActive, setIsActive] = useState(true)

  const handleCreateCategory = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('slug', slug)
      formData.append('description', description)
      formData.append('image', image)
      formData.append('isActive', isActive)

      const response = await axios.post('/api/get-categories', formData)
      console.log('Category created:', response.data)
      alert('Category created successfully')

      // Reset form
      setName('')
      setSlug('')
      setDescription('')
      setImage(null)
      setIsActive(true)
    } catch (error) {
      console.error('Error creating category:', error)
      alert('Failed to create category')
    }
  }

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen px-4 py-10 text-black items-center">
      <h1 className="text-3xl font-bold mb-6">Create Category</h1>
      <form onSubmit={handleCreateCategory} className="bg-white p-6 rounded shadow-md w-full max-w-xl space-y-4">
        <div>
          <label className="block font-semibold text-lg mb-1">Category Name</label>
          <input
            type="text"
            className="border border-gray-600 rounded p-2 w-full"
            placeholder="e.g. Skincare"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))
            }}
          />
        </div>

        <div>
          <label className="block font-semibold text-lg mb-1">Slug</label>
          <input
            type="text"
            className="border border-gray-600 rounded p-2 w-full"
            placeholder="e.g. skincare"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold text-lg mb-1">Description</label>
          <textarea
            className="border border-gray-600 rounded p-2 w-full"
            placeholder="Describe this category"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold text-lg mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="border border-gray-600 rounded p-2 w-full"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
          <label className="text-lg font-medium">Is Active</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
        >
          Create Category
        </button>
      </form>
    </div>
  )
}

export default CreateCategoryPage
