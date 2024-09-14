'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createStore, listProduct, generateStoreLink } from '../app/api/actions'

export default function Dashboard() {
  const { connected } = useWallet()
  const [storeId, setStoreId] = useState('')
  const [storeLink, setStoreLink] = useState('')

  if (!connected) {
    redirect('/')
  }

  const handleCreateStore = async (formData: FormData) => {
    const result = await createStore(formData)
    if (result.success) {
      setStoreId(formData.get('storeName') as string)
    }
  }

  const handleListProduct = async (formData: FormData) => {
    await listProduct(formData)
  }

  const handleGenerateLink = async () => {
    const link = await generateStoreLink(storeId)
    setStoreLink(link)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Create Store</h2>
        <form action={handleCreateStore} className="space-y-4">
          <Input name="storeName" placeholder="Store Name" required />
          <Button type="submit">Create Store</Button>
        </form>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">List Product</h2>
        <form action={handleListProduct} className="space-y-4">
          <Input name="productName" placeholder="Product Name" required />
          <Input name="productPrice" type="number" placeholder="Price" required />
          <Input name="productDescription" placeholder="Description" required />
          <Button type="submit">List Product</Button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Generate Store Link</h2>
        <div className="flex items-center space-x-4">
          <Button onClick={handleGenerateLink}>Generate Link</Button>
          {storeLink && (
            <a href={storeLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {storeLink}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}