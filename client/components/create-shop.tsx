'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createStore } from '@/app/api/actions'

export function CreateShop() {
  const [storeName, setStoreName] = useState('')
  const [storeId, setStoreId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreateStore = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!storeName.trim()) {
      setError('Store name cannot be empty.')
      return
    }

    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('storeName', storeName)

    try {
      const result = await createStore(formData)
      if (result.success) {
        setStoreId(storeName)
        setStoreName('') // Clear the input field
      } else {
        setError(result.message || 'Failed to create store.')
      }
    } catch (err) {
      setError(`An error occurred: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Create Store</h2>
      <form onSubmit={handleCreateStore} className="space-y-4">
        <Input
          name="storeName"
          placeholder="Store Name"
          required
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Store'}
        </Button>
      </form>
      {storeId && (
        <p className="mt-4 text-green-600">Store created successfully: {storeId}</p>
      )}
      {error && (
        <p className="mt-4 text-red-600">{error}</p>
      )}
    </div>
  )
}
