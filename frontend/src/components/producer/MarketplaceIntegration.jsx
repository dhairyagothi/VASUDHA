import React, { useState } from 'react';
import { ShoppingCart, Award, DollarSign, TrendingUp, Star, MapPin, Calendar } from 'lucide-react';

const MarketplaceIntegration = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      animalId: 'C001',
      animalName: 'Ganga',
      productType: 'Milk',
      quantity: '50L',
      quality: 'Premium',
      mrlCompliant: true,
      withdrawalClear: true,
      price: 45,
      pricePerUnit: 0.9,
      certification: 'VASUDHA Certified',
      listedDate: '2025-09-25',
      status: 'available',
      blockchainId: 'BC001'
    },
    {
      id: 2,
      animalId: 'C004',
      animalName: 'Kamdhenu',
      productType: 'Milk',
      quantity: '40L',
      quality: 'Standard',
      mrlCompliant: true,
      withdrawalClear: true,
      price: 36,
      pricePerUnit: 0.9,
      certification: 'VASUDHA Certified',
      listedDate: '2025-09-25',
      status: 'available',
      blockchainId: 'BC002'
    }
  ]);

  const [marketPrices] = useState([
    { region: 'Local Market', milk: 0.85, meat: 8.5 },
    { region: 'Premium Market', milk: 1.2, meat: 12.0 },
    { region: 'Organic Market', milk: 1.5, meat: 15.0 }
  ]);

  const [showListModal, setShowListModal] = useState(false);
  const [newListing, setNewListing] = useState({
    animalId: '',
    productType: 'milk',
    quantity: '',
    quality: 'standard',
    expectedPrice: ''
  });

  const handleListProduct = () => {
    // Implementation for listing product
    console.log('Listing product:', newListing);
    setShowListModal(false);
  };

  const getPremiumBadge = (product) => {
    if (product.mrlCompliant && product.withdrawalClear && product.quality === 'Premium') {
      return 'Premium Traceable';
    } else if (product.mrlCompliant && product.withdrawalClear) {
      return 'MRL Compliant';
    }
    return 'Standard';
  };

  const getBadgeColor = (product) => {
    const badge = getPremiumBadge(product);
    if (badge === 'Premium Traceable') return 'bg-gold text-yellow-800 border-yellow-300';
    if (badge === 'MRL Compliant') return 'bg-green-100 text-green-800 border-green-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Marketplace Integration</h1>
          <p className="text-gray-600 mt-2">List and sell your compliant products at premium prices</p>
        </div>
        <button
          onClick={() => setShowListModal(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>List Product</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Market Prices */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Market Prices
          </h2>
          <div className="space-y-4">
            {marketPrices.map((market, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">{market.region}</h3>
                  <MapPin className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Milk (per liter):</span>
                    <span className="font-medium">₹{market.milk}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Meat (per kg):</span>
                    <span className="font-medium">₹{market.meat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium Benefits */}
          <div className="mt-6 bg-gradient-to-r from-yellow-50 to-green-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Award className="w-6 h-6 text-yellow-600 mt-1" />
              <div>
                <h4 className="font-medium text-gray-800">Premium Benefits</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• 25-40% price premium for traceable products</li>
                  <li>• Priority listing in marketplace</li>
                  <li>• Blockchain certificate inclusion</li>
                  <li>• Consumer trust badge</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Your Listings */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Your Active Listings</h2>
              <p className="text-gray-600">Products available for sale</p>
            </div>

            <div className="divide-y">
              {products.map((product) => (
                <div key={product.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {product.productType} from {product.animalName}
                        </h3>
                        <span className={`px-3 py-1 text-xs rounded-full border ${getBadgeColor(product)}`}>
                          {getPremiumBadge(product)}
                        </span>
                        {product.mrlCompliant && (
                          <Star className="w-5 h-5 text-yellow-500" />
                        )}
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Quantity</p>
                          <p className="font-medium">{product.quantity}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Quality Grade</p>
                          <p className="font-medium">{product.quality}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Animal ID</p>
                          <p className="font-medium">{product.animalId}</p>
                        </div>
                      </div>

                      {/* Compliance Status */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.mrlCompliant && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            ✓ MRL Compliant
                          </span>
                        )}
                        {product.withdrawalClear && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            ✓ Withdrawal Clear
                          </span>
                        )}
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          ✓ Blockchain Certified
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
                          <p className="text-sm text-gray-600">₹{product.pricePerUnit} per unit</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Listed on</p>
                          <p className="font-medium">{new Date(product.listedDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="ml-6 flex flex-col space-y-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                        View Certificate
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                        Edit Listing
                      </button>
                      <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm">
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Blockchain Certificate Preview */}
                  <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Award className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-blue-800">Blockchain Certificate</h4>
                        <p className="text-blue-700 text-sm">
                          ID: {product.blockchainId} • Verifiable traceability from farm to market
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Analytics */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Market Analytics</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">₹2,890</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">32%</p>
                <p className="text-sm text-gray-600">Premium Uplift</p>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">4.8/5</p>
                <p className="text-sm text-gray-600">Quality Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* List Product Modal */}
      {showListModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">List New Product</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Animal ID</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  value={newListing.animalId}
                  onChange={(e) => setNewListing({...newListing, animalId: e.target.value})}
                  placeholder="Enter animal ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={newListing.productType}
                  onChange={(e) => setNewListing({...newListing, productType: e.target.value})}
                >
                  <option value="milk">Milk</option>
                  <option value="meat">Meat</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  value={newListing.quantity}
                  onChange={(e) => setNewListing({...newListing, quantity: e.target.value})}
                  placeholder="e.g., 50L or 10kg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quality Grade</label>
                <select
                  className="w-full border rounded-lg px-3 py-2"
                  value={newListing.quality}
                  onChange={(e) => setNewListing({...newListing, quality: e.target.value})}
                >
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="organic">Organic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Price (₹)</label>
                <input
                  type="number"
                  className="w-full border rounded-lg px-3 py-2"
                  value={newListing.expectedPrice}
                  onChange={(e) => setNewListing({...newListing, expectedPrice: e.target.value})}
                  placeholder="Enter expected price"
                />
              </div>
              <div className="flex space-x-2 mt-6">
                <button
                  onClick={() => setShowListModal(false)}
                  className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleListProduct}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  List Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplaceIntegration;