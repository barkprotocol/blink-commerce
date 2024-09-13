import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Package, TrendingUp, Users } from "lucide-react"
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'

export default function MerchantDashboard() {
  const [products, setProducts] = useState([
    { id: 1, name: 'T-Shirt', price: 0.5, sales: 10 },
    { id: 2, name: 'Mug', price: 0.3, sales: 15 },
    { id: 3, name: 'Poster', price: 0.2, sales: 20 },
  ])
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [totalSales, setTotalSales] = useState(0)
  const [balance, setBalance] = useState(0)

  const MERCHANT_WALLET = new PublicKey('YOUR_MERCHANT_WALLET_ADDRESS')
  const NETWORK = 'devnet'
  const connection = new Connection(`https://api.${NETWORK}.solana.com`)

  useEffect(() => {
    fetchBalanceAndTransactions()
    calculateTotals()
  }, [])

  const fetchBalanceAndTransactions = async () => {
    try {
      const balance = await connection.getBalance(MERCHANT_WALLET)
      setBalance(balance / LAMPORTS_PER_SOL)

      // In a real application, you would fetch actual transaction history here
      // For demonstration, we're using mock data
    } catch (error) {
      console.error('Error fetching balance:', error)
    }
  }

  const calculateTotals = () => {
    const revenue = products.reduce((total, product) => total + product.price * product.sales, 0)
    const sales = products.reduce((total, product) => total + product.sales, 0)
    setTotalRevenue(revenue)
    setTotalSales(sales)
  }

  const addProduct = () => {
    // In a real application, this would open a modal or form to add a new product
    const newProduct = {
      id: products.length + 1,
      name: `New Product ${products.length + 1}`,
      price: 0.1,
      sales: 0
    }
    setProducts([...products, newProduct])
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Merchant Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toFixed(2)} SOL</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balance.toFixed(2)} SOL</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Products</h2>
            <Button onClick={addProduct}>Add Product</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price (SOL)</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Revenue (SOL)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell>{(product.price * product.sales).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4">
          <h2 className="text-2xl font-bold">Recent Transactions</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount (SOL)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* In a real application, you would map over actual transaction data here */}
              <TableRow>
                <TableCell>{new Date().toLocaleDateString()}</TableCell>
                <TableCell>T-Shirt</TableCell>
                <TableCell>0.5</TableCell>
                <TableCell>Completed</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{new Date().toLocaleDateString()}</TableCell>
                <TableCell>Mug</TableCell>
                <TableCell>0.3</TableCell>
                <TableCell>Completed</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  )
}